import { DOCUMENT } from "@angular/common";
import { Injectable, inject } from "@angular/core";
import type { Theme } from "./theme-storage";

@Injectable({
    providedIn: "root",
})
export class DocumentService {
    private readonly doc = inject(DOCUMENT);

    toggleDarkMode(): void {
        this.doc.documentElement.classList.toggle("dark-theme");
    }

    /**
     * Applies the given theme to the document (e.g. on init or restore).
     */
    applyTheme(theme: Theme): void {
        this.doc.documentElement.classList.toggle("dark-theme", theme === "dark");
    }

    get isDarkMode(): boolean {
        return this.doc.documentElement.classList.contains("dark-theme");
    }
}