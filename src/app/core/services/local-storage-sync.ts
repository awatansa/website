import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY_PREFIX = 'vy';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageSyncService {
  private readonly platformId = inject(PLATFORM_ID);

  private prefixedKey(key: string): string {
    return `${STORAGE_KEY_PREFIX}.${key}`;
  }

  /**
   * Gets a value from local storage by key.
   * Keys are prefixed with "vy" application-wide.
   * @param key - Storage key (without prefix)
   * @param defaultValue - Optional value returned when key is missing or in non-browser environment
   * @returns The parsed value or defaultValue
   */
  get<T>(key: string, defaultValue?: T): T {
    if (!isPlatformBrowser(this.platformId)) {
      return defaultValue as T;
    }
    try {
      const raw = localStorage.getItem(this.prefixedKey(key));
      if (raw === null) {
        return defaultValue as T;
      }
      return JSON.parse(raw) as T;
    } catch {
      return defaultValue as T;
    }
  }

  /**
   * Saves a value to local storage by key.
   * Keys are prefixed with "vy" application-wide.
   * @param key - Storage key (without prefix)
   * @param value - Value to store (must be JSON-serializable)
   */
  set<T>(key: string, value: T): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      localStorage.setItem(this.prefixedKey(key), JSON.stringify(value));
    } catch {
      // Ignore quota or serialization errors
    }
  }

  /**
   * Removes a value from local storage by key.
   * @param key - Storage key (without prefix)
   */
  remove(key: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      localStorage.removeItem(this.prefixedKey(key));
    } catch {
      // Ignore errors
    }
  }
}
