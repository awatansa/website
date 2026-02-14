import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type TransformMode = 'live' | 'onClick';

export interface Base64State {
  plainText: string;
  base64Text: string;
  transformMode: TransformMode;
  decodeError: string | null;
  encodeError: string | null;
}

const initialState: Base64State = {
  plainText: '',
  base64Text: '',
  transformMode: 'live',
  decodeError: null,
  encodeError: null,
};

function tryEncode(value: string): { result: string; error: string | null } {
  if (value === '') return { result: '', error: null };
  try {
    const encoded = btoa(unescape(encodeURIComponent(value)));
    return { result: encoded, error: null };
  } catch {
    return { result: '', error: 'Invalid characters for Base64 encoding' };
  }
}

function tryDecode(value: string): { result: string; error: string | null } {
  if (value === '') return { result: '', error: null };
  try {
    const decoded = decodeURIComponent(escape(atob(value.trim())));
    return { result: decoded, error: null };
  } catch {
    return { result: '', error: 'Invalid Base64 string' };
  }
}

export const Base64Store = signalStore(
  withState<Base64State>(initialState),
  withMethods((store) => ({
    setTransformMode(mode: TransformMode) {
      patchState(store, { transformMode: mode });
    },
    setPlainText(value: string) {
      if (store.transformMode() === 'live') {
        const { result, error } = tryEncode(value);
        patchState(store, {
          plainText: value,
          base64Text: result,
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
    setBase64Text(value: string) {
      if (store.transformMode() === 'live') {
        const { result, error } = tryDecode(value);
        patchState(store, {
          base64Text: value,
          plainText: result,
          decodeError: error,
          encodeError: null,
        });
      } else {
        patchState(store, {
          base64Text: value,
          decodeError: null,
        });
      }
    },
    encode() {
      const plain = store.plainText();
      const { result, error } = tryEncode(plain);
      patchState(store, {
        base64Text: result,
        encodeError: error,
        decodeError: null,
      });
    },
    decode() {
      const base64 = store.base64Text();
      const { result, error } = tryDecode(base64);
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
