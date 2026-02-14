import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type TransformMode = 'live' | 'onClick';

export interface UrlEncodeDecodeState {
  plainText: string;
  encodedText: string;
  transformMode: TransformMode;
  decodeError: string | null;
  encodeError: string | null;
}

const initialState: UrlEncodeDecodeState = {
  plainText: '',
  encodedText: '',
  transformMode: 'live',
  decodeError: null,
  encodeError: null,
};

function tryEncode(value: string): { result: string; error: string | null } {
  if (value === '') return { result: '', error: null };
  try {
    const encoded = encodeURIComponent(value);
    return { result: encoded, error: null };
  } catch {
    return { result: '', error: 'Failed to encode as URL string' };
  }
}

function tryDecode(value: string): { result: string; error: string | null } {
  if (value === '') return { result: '', error: null };
  try {
    const decoded = decodeURIComponent(value.replace(/\+/g, ' '));
    return { result: decoded, error: null };
  } catch {
    return { result: '', error: 'Invalid URL-encoded string (e.g. malformed % sequence)' };
  }
}

export const UrlEncodeDecodeStore = signalStore(
  withState<UrlEncodeDecodeState>(initialState),
  withMethods((store) => ({
    setTransformMode(mode: TransformMode) {
      patchState(store, { transformMode: mode });
    },
    setPlainText(value: string) {
      if (store.transformMode() === 'live') {
        const { result, error } = tryEncode(value);
        patchState(store, {
          plainText: value,
          encodedText: result,
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
    setEncodedText(value: string) {
      if (store.transformMode() === 'live') {
        const { result, error } = tryDecode(value);
        patchState(store, {
          encodedText: value,
          plainText: result,
          decodeError: error,
          encodeError: null,
        });
      } else {
        patchState(store, {
          encodedText: value,
          decodeError: null,
        });
      }
    },
    encode() {
      const plain = store.plainText();
      const { result, error } = tryEncode(plain);
      patchState(store, {
        encodedText: result,
        encodeError: error,
        decodeError: null,
      });
    },
    decode() {
      const encoded = store.encodedText();
      const { result, error } = tryDecode(encoded);
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
