/**
 * Custom primary color palette for PrimeNG theme.
 * Base colors: rgb(62, 95, 68), rgb(94, 147, 108), rgb(147, 218, 151), rgb(232, 255, 215)
 */
export const primaryPalette = {
  50: '#e8ffd7',   // rgb(232, 255, 215) - lightest
  100: '#d4f5c4',
  200: '#93da97',  // rgb(147, 218, 151)
  300: '#7acc7f',
  400: '#6bb86f',
  500: '#5e936c',  // rgb(94, 147, 108) - main primary
  600: '#517a5d',
  700: '#3e5f44',  // rgb(62, 95, 68) - dark
  800: '#354d39',
  900: '#2a3d2e',
  950: '#1e2a20',
} as const;

/**
 * Primitive tokens: add the custom primary palette under a named key
 * so the semantic primary can reference it.
 */
export const primaryPalettePrimitive = {
  brandPrimary: primaryPalette,
};

/**
 * Semantic override: point primary to our brandPrimary primitive palette.
 */
export const primaryPaletteSemantic = {
  primary: {
    50: '{brandPrimary.50}',
    100: '{brandPrimary.100}',
    200: '{brandPrimary.200}',
    300: '{brandPrimary.300}',
    400: '{brandPrimary.400}',
    500: '{brandPrimary.500}',
    600: '{brandPrimary.600}',
    700: '{brandPrimary.700}',
    800: '{brandPrimary.800}',
    900: '{brandPrimary.900}',
    950: '{brandPrimary.950}',
  },
};

/**
 * Preset overrides to apply with definePreset(Aura, primeNgThemePresetOverrides).
 * Use: definePreset(Aura, primeNgThemePresetOverrides)
 */
export const primeNgThemePresetOverrides = {
  primitive: primaryPalettePrimitive,
  semantic: primaryPaletteSemantic,
};
