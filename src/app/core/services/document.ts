import { DOCUMENT } from "@angular/common";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class DocumentService {
    private readonly doc = inject(DOCUMENT);

    toggleDarkMode(): void {
        this.doc.documentElement.classList.toggle("dark-theme");
    }

    get isDarkMode(): boolean {
        return this.doc.documentElement.classList.contains("dark-theme");
    }
}