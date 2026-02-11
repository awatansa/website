import { inject } from "@angular/core";
import { patchState, signalStore, withState, withMethods, withHooks } from "@ngrx/signals";
import { DocumentService } from '@/core/services/document';
import { ThemeStorageService } from '@/core/services/theme-storage';

export interface GlobalState {
    theme: 'light' | 'dark';
}

export const GlobalStore = signalStore(
    { providedIn: 'root' },
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
                documentService.applyTheme(nextTheme);
                themeStorage.setTheme(nextTheme);
            },
            setTheme: (theme: 'light' | 'dark') => {
                if (store.theme() === theme) return;
                patchState(store, { theme });
                documentService.applyTheme(theme);
                themeStorage.setTheme(theme);
            },
        };
    }),
    withHooks({
        onInit(store) {
            const themeStorage = inject(ThemeStorageService);
            const documentService = inject(DocumentService);
            const initialTheme = themeStorage.getTheme();
            patchState(store, { theme: initialTheme });
            documentService.applyTheme(initialTheme);
        },
    })
);