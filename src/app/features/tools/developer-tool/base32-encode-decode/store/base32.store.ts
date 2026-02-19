import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type TransformMode = 'live' | 'onClick';

export interface Base32State {
  plainText: string;
  base32Text: string;
  transformMode: TransformMode;
  decodeError: string | null;
  encodeError: string | null;
}

const initialState: Base32State = {
  plainText: '',
  base32Text: '',
  transformMode: 'live',
  decodeError: null,
  encodeError: null,
};

/** RFC 4648 Base32 alphabet (A-Z, 2-7). */
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function encodeToBase32(value: string): { result: string; error: string | null } {
  if (value === '') return { result: '', error: null };
  try {
    const bytes = new TextEncoder().encode(value);
    let result = '';
    let buffer = 0;
    let bits = 0;
    for (const byte of bytes) {
      buffer = (buffer << 8) | byte;
      bits += 8;
      while (bits >= 5) {
        bits -= 5;
        result += BASE32_ALPHABET[(buffer >>> bits) & 31];
      }
    }
    if (bits > 0) {
      result += BASE32_ALPHABET[(buffer << (5 - bits)) & 31];
    }
    const pad = (8 - (result.length % 8)) % 8;
    result += '='.repeat(pad);
    return { result, error: null };
  } catch {
    return { result: '', error: 'Invalid characters for Base32 encoding' };
  }
}

function decodeFromBase32(value: string): { result: string; error: string | null } {
  const trimmed = value.replace(/\s/g, '').replace(/=+$/, '');
  if (trimmed === '') return { result: '', error: null };
  const alphabetIndex: Record<string, number> = {};
  for (let i = 0; i < BASE32_ALPHABET.length; i++) {
    alphabetIndex[BASE32_ALPHABET[i]] = i;
  }
  try {
    const bytes: number[] = [];
    let buffer = 0;
    let bits = 0;
    for (const char of trimmed.toUpperCase()) {
      const idx = alphabetIndex[char];
      if (idx === undefined) {
        return { result: '', error: 'Invalid Base32 character: ' + char };
      }
      buffer = (buffer << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        bits -= 8;
        bytes.push((buffer >>> bits) & 0xff);
      }
    }
    const result = new TextDecoder().decode(new Uint8Array(bytes));
    return { result, error: null };
  } catch {
    return { result: '', error: 'Invalid Base32 string' };
  }
}

export const Base32Store = signalStore(
  withState<Base32State>(initialState),
  withMethods((store) => ({
    setTransformMode(mode: TransformMode) {
      patchState(store, { transformMode: mode });
    },
    setPlainText(value: string) {
      if (store.transformMode() === 'live') {
        const { result, error } = encodeToBase32(value);
        patchState(store, {
          plainText: value,
          base32Text: result,
          encodeError: error,
          decodeError: null,
        });
      } else {
        patchState(store, {
          plainText: value,
          encodeError: null,
        });
      }
    },
    setBase32Text(value: string) {
      if (store.transformMode() === 'live') {
        const { result, error } = decodeFromBase32(value);
        patchState(store, {
          base32Text: value,
          plainText: result,
          decodeError: error,
          encodeError: null,
        });
      } else {
        patchState(store, {
          base32Text: value,
          decodeError: null,
        });
      }
    },
    encode() {
      const plain = store.plainText();
      const { result, error } = encodeToBase32(plain);
      patchState(store, {
        base32Text: result,
        encodeError: error,
        decodeError: null,
      });
    },
    decode() {
      const base32 = store.base32Text();
      const { result, error } = decodeFromBase32(base32);
      patchState(store, {
        plainText: result,
        decodeError: error,
        encodeError: null,
      });
    },
    clear() {
      patchState(store, initialState);
    },
  }))
);
