import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { DARK_THEME_CLASS } from '@/core/config';
import type { Theme } from '@/core/services/theme-storage';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private readonly doc = inject(DOCUMENT);

  toggleDarkMode(): void {
    this.doc.documentElement.classList.toggle(DARK_THEME_CLASS);
  }

  /**
   * Applies the given theme to the document (e.g. on init or restore).
   */
  applyTheme(theme: Theme): void {
    this.doc.documentElement.classList.toggle(DARK_THEME_CLASS, theme === 'dark');
  }

  get isDarkMode(): boolean {
    return this.doc.documentElement.classList.contains(DARK_THEME_CLASS);
  }
}