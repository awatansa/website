import { inject } from '@angular/core';
import { patchState, signalStore, withState, withMethods, withHooks } from '@ngrx/signals';
import type { AboutData } from '@/features/about/models';
import { AboutDataService } from '@/features/about/services';

export interface AboutState {
  data: AboutData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AboutState = {
  data: null,
  loading: false,
  error: null,
};

export const AboutStore = signalStore(
  withState<AboutState>(initialState),
  withMethods((store) => {
    const aboutDataService = inject(AboutDataService);

    return {
      load: () => {
        patchState(store, { loading: true, error: null });
        aboutDataService.getData().subscribe({
          next: (data) => patchState(store, { data, loading: false, error: null }),
          error: (err: Error) =>
            patchState(store, {
              loading: false,
              error: err.message ?? 'Failed to load about data',
            }),
        });
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.load();
    },
  })
);
