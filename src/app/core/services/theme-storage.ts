import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageSyncService } from './local-storage-sync';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorageService {
  private readonly storage = inject(LocalStorageSyncService);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Returns the current system preference (prefers-color-scheme).
   * Falls back to 'light' when not in a browser (e.g. SSR).
   */
  getSystemTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Gets the theme: stored value if present, otherwise system theme.
   */
  getTheme(): Theme {
    const stored = this.storage.get<Theme>(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return this.getSystemTheme();
  }

  /**
   * Persists the theme only when it differs from the system theme.
   * When the user selects the current system theme, the stored value is cleared
   * so the app follows system preference again.
   */
  setTheme(theme: Theme): void {
    if (theme === this.getSystemTheme()) {
      this.storage.remove(THEME_STORAGE_KEY);
    } else {
      this.storage.set(THEME_STORAGE_KEY, theme);
    }
  }
}
