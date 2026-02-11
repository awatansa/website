import { Injectable, inject } from '@angular/core';
import { LocalStorageSyncService } from './local-storage-sync';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorageService {
  private readonly storage = inject(LocalStorageSyncService);

  /**
   * Gets the persisted theme from local storage.
   * @param defaultValue - Optional default when no value is stored (e.g. 'light')
   */
  getTheme(defaultValue?: Theme): Theme {
    const value = this.storage.get<Theme>(THEME_STORAGE_KEY, defaultValue);
    return value === 'dark' || value === 'light' ? value : (defaultValue ?? 'light');
  }

  /**
   * Saves the theme to local storage and keeps it in sync.
   */
  setTheme(theme: Theme): void {
    this.storage.set(THEME_STORAGE_KEY, theme);
  }
}
