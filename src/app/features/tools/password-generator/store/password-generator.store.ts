import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:'\",./<>?`~";

export interface PasswordGeneratorState {
  count: number;
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  passwords: string[];
}

const MIN_COUNT = 1;
const MAX_COUNT = 50;
const MIN_LENGTH = 8;
const MAX_LENGTH = 128;

const initialState: PasswordGeneratorState = {
  count: 5,
  length: 16,
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: true,
  passwords: [],
};

function buildCharacterSet(state: PasswordGeneratorState): string {
  let set = '';
  if (state.includeLowercase) set += LOWER;
  if (state.includeUppercase) set += UPPER;
  if (state.includeNumbers) set += NUMBERS;
  if (state.includeSymbols) set += SYMBOLS;
  return set;
}

/**
 * Generate one password using crypto.getRandomValues (Web Crypto API).
 * Uses rejection sampling to avoid modulo bias.
 */
function generateOnePassword(chars: string, length: number): string {
  if (chars.length === 0 || length <= 0) return '';
  const len = chars.length;
  const threshold = 256 - (256 % len);
  const arr = new Uint8Array(length);
  let result = '';
  let i = 0;
  while (i < length) {
    globalThis.crypto.getRandomValues(arr);
    for (let j = 0; j < arr.length && i < length; j++) {
      if (arr[j]! < threshold) {
        result += chars[arr[j]! % len];
        i++;
      }
    }
  }
  return result;
}

export const PasswordGeneratorStore = signalStore(
  withState<PasswordGeneratorState>(initialState),
  withComputed((store) => ({
    canGenerate: () => {
      const c = store.count();
      const l = store.length();
      if (c < MIN_COUNT || c > MAX_COUNT || l < MIN_LENGTH || l > MAX_LENGTH) return false;
      const hasLower = store.includeLowercase();
      const hasUpper = store.includeUppercase();
      const hasNumbers = store.includeNumbers();
      const hasSymbols = store.includeSymbols();
      return hasLower || hasUpper || hasNumbers || hasSymbols;
    },
    errorMessage: () => {
      const hasAny =
        store.includeLowercase() ||
        store.includeUppercase() ||
        store.includeNumbers() ||
        store.includeSymbols();
      if (!hasAny) return 'Select at least one character type.';
      return null;
    },
  })),
  withMethods((store) => ({
    setCount(value: number) {
      const v = Math.max(MIN_COUNT, Math.min(MAX_COUNT, Math.round(value)));
      patchState(store, { count: v });
    },
    setLength(value: number) {
      const v = Math.max(MIN_LENGTH, Math.min(MAX_LENGTH, Math.round(value)));
      patchState(store, { length: v });
    },
    setIncludeLowercase(value: boolean) {
      patchState(store, { includeLowercase: value });
    },
    setIncludeUppercase(value: boolean) {
      patchState(store, { includeUppercase: value });
    },
    setIncludeNumbers(value: boolean) {
      patchState(store, { includeNumbers: value });
    },
    setIncludeSymbols(value: boolean) {
      patchState(store, { includeSymbols: value });
    },
    generate() {
      if (!store.canGenerate()) return;
      const count = store.count();
      const length = store.length();
      const state: PasswordGeneratorState = {
        count: store.count(),
        length: store.length(),
        includeLowercase: store.includeLowercase(),
        includeUppercase: store.includeUppercase(),
        includeNumbers: store.includeNumbers(),
        includeSymbols: store.includeSymbols(),
        passwords: [],
      };
      const chars = buildCharacterSet(state);
      const passwords = Array.from({ length: count }, () => generateOnePassword(chars, length));
      patchState(store, { passwords });
    },
    clearPasswords() {
      patchState(store, { passwords: [] });
    },
  }))
);
