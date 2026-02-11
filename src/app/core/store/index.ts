import { inject } from "@angular/core";
import { patchState, signalStore, withState, withMethods } from "@ngrx/signals";
import { DocumentService } from "../services/document";
import { ThemeStorageService } from "../services/theme-storage";

interface GlobalState {
    theme: 'light' | 'dark';
}

export const GlobalStore = signalStore(
    withState<GlobalState>({
        theme: 'light',
    }),
    withMethods((store) => {
        const documentService = inject(DocumentService);
        const themeStorage = inject(ThemeStorageService);

        return {
            toggleDarkMode: () => {
                const nextTheme = store.theme() === 'light' ? 'dark' : 'light';
                patchState(store, { theme: nextTheme });
                documentService.toggleDarkMode();
                themeStorage.setTheme(nextTheme);
            },
        };
    })
);