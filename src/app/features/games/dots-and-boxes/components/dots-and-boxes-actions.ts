import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { DotsAndBoxesStore } from '@/features/games/dots-and-boxes/store';

@Component({
  selector: 'vy-dots-and-boxes-actions',
  imports: [RouterLink, Button],
  host: {
    'aria-label': 'Game actions',
  },
  template: `
    <div class="flex flex-wrap gap-3">
      <p-button
        label="New game"
        icon="pi pi-refresh"
        iconPos="left"
        (onClick)="store.reset()"
        [attr.aria-label]="'Start a new game'"
      />
      <a
        routerLink="/games/casual"
        class="inline-flex items-center rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-0 dark:bg-surface-900 px-4 py-2 font-medium hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Back to casual games"
      >
        Back to casual games
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsAndBoxesActionsComponent {
  protected readonly store = inject(DotsAndBoxesStore);
}
