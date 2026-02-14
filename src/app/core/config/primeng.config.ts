import type { PrimeNGConfigType } from 'primeng/config';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { primeNgThemePresetOverrides } from '@/core/config/prime-ng-theme.config';

/**
 * CSS class applied to the document root when dark theme is active.
 * Used by PrimeNG (darkModeSelector), DocumentService, and Tailwind's dark: variant
 * (see src/styles.css @custom-variant dark) so theme and utility classes stay in sync.
 */
export const DARK_THEME_CLASS = 'dark-theme';

/**
 * PrimeNG application configuration.
 * Use with app config: providers: [..., ...primeNgProviders]
 */
export const primeNgConfig: PrimeNGConfigType = {
  theme: {
    preset: definePreset(Aura, primeNgThemePresetOverrides),
    options: {
      darkModeSelector: `.${DARK_THEME_CLASS}`,
    },
  },
  ripple: true,
};

/**
 * Environment providers for PrimeNG. Add to ApplicationConfig.providers.
 */
export const primeNgProviders = (config?: PrimeNGConfigType) => providePrimeNG({ ...primeNgConfig, ...config });
