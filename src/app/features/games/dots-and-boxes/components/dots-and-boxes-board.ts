import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DotsAndBoxesGridSizeComponent } from '@/features/games/dots-and-boxes/components/dots-and-boxes-grid-size';
import { DotsAndBoxesStatusComponent } from '@/features/games/dots-and-boxes/components/dots-and-boxes-status';
import { DotsAndBoxesGridComponent } from '@/features/games/dots-and-boxes/components/dots-and-boxes-grid';
import { DotsAndBoxesActionsComponent } from '@/features/games/dots-and-boxes/components/dots-and-boxes-actions';

@Component({
  selector: 'vy-dots-and-boxes',
  imports: [
    RouterLink,
    DotsAndBoxesGridSizeComponent,
    DotsAndBoxesStatusComponent,
    DotsAndBoxesGridComponent,
    DotsAndBoxesActionsComponent,
  ],
  host: {
    'aria-label': 'Dots and Boxes game',
  },
  template: `
    <div class="mx-auto max-w-2xl p-6">
      <nav class="mb-6" aria-label="Breadcrumb">
        <a
          routerLink="/games/casual"
          class="text-primary hover:underline"
          aria-label="Back to casual games"
        >
          ← Casual games
        </a>
      </nav>

      <h1 class="text-surface-700 dark:text-surface-200 mb-2 text-2xl font-semibold" id="dab-heading">
        Dots and Boxes
      </h1>

      <div class="mb-4">
        <vy-dots-and-boxes-grid-size />
      </div>

      <vy-dots-and-boxes-status />

      <vy-dots-and-boxes-grid />

      <div class="mt-6">
        <vy-dots-and-boxes-actions />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsAndBoxesBoardComponent {}
