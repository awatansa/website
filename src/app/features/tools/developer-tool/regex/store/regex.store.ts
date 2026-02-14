import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export interface RegexMatch {
  full: string;
  index: number;
  groups: string[];
}

export interface TextSegment {
  text: string;
  isMatch: boolean;
}

export interface RegexCheckState {
  pattern: string;
  testString: string;
  flags: string;
}

const DEFAULT_FLAGS = 'gm';

const initialState: RegexCheckState = {
  pattern: '',
  testString: '',
  flags: DEFAULT_FLAGS,
};

function buildRegex(
  pattern: string,
  flags: string
): { regex: RegExp | null; error: string | null } {
  if (pattern === '') return { regex: null, error: null };
  try {
    const regex = new RegExp(pattern, flags);
    return { regex, error: null };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Invalid regular expression';
    return { regex: null, error: message };
  }
}

function getMatches(regex: RegExp, testString: string): RegexMatch[] {
  const matches: RegexMatch[] = [];
  const flags = regex.flags;
  const globalRegex = flags.includes('g') ? regex : new RegExp(regex.source, flags + 'g');
  const iterator = testString.matchAll(globalRegex);
  for (const m of iterator) {
    const full = m[0] ?? '';
    const index = m.index ?? 0;
    const groups: string[] = [];
    if (m.length > 1) {
      for (let i = 1; i < m.length; i++) {
        groups.push(m[i] ?? '');
      }
    }
    matches.push({ full, index, groups });
  }
  return matches;
}

function buildSegments(testString: string, matches: RegexMatch[]): TextSegment[] {
  if (matches.length === 0) {
    return testString === '' ? [] : [{ text: testString, isMatch: false }];
  }
  const segments: TextSegment[] = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.index > lastEnd) {
      segments.push({
        text: testString.slice(lastEnd, m.index),
        isMatch: false,
      });
    }
    segments.push({ text: m.full, isMatch: true });
    lastEnd = m.index + m.full.length;
  }
  if (lastEnd < testString.length) {
    segments.push({
      text: testString.slice(lastEnd),
      isMatch: false,
    });
  }
  return segments;
}

export const RegexCheckStore = signalStore(
  withState<RegexCheckState>(initialState),
  withComputed((store) => {
    const pattern = store.pattern;
    const testString = store.testString;
    const flags = store.flags;

    return {
      regexError: () => {
        const { error } = buildRegex(pattern(), flags());
        return error;
      },
      regex: () => {
        const { regex } = buildRegex(pattern(), flags());
        return regex;
      },
      matches: () => {
        const re = buildRegex(pattern(), flags()).regex;
        if (!re || testString() === '') return [];
        return getMatches(re, testString());
      },
      segments: () => {
        const re = buildRegex(pattern(), flags()).regex;
        const str = testString();
        if (!re) return str === '' ? [] : [{ text: str, isMatch: false }];
        const matches = getMatches(re, str);
        return buildSegments(str, matches);
      },
      matchCount: () => {
        const re = buildRegex(pattern(), flags()).regex;
        if (!re || testString() === '') return 0;
        return getMatches(re, testString()).length;
      },
      groupCount: () => {
        const re = buildRegex(pattern(), flags()).regex;
        if (!re || testString() === '') return 0;
        const m = getMatches(re, testString());
        return m.length > 0 && m[0].groups.length > 0 ? m[0].groups.length : 0;
      },
    };
  }),
  withMethods((store) => ({
    setPattern(value: string) {
      patchState(store, { pattern: value });
    },
    setTestString(value: string) {
      patchState(store, { testString: value });
    },
    setFlags(value: string) {
      patchState(store, { flags: value || DEFAULT_FLAGS });
    },
    clear() {
      patchState(store, initialState);
    },
  }))
);
