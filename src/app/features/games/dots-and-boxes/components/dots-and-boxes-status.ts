import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DotsAndBoxesStore } from '@/features/games/dots-and-boxes/store';

@Component({
  selector: 'vy-dots-and-boxes-status',
  host: {
    'aria-label': 'Game status and scores',
  },
  template: `
    <p
      class="text-surface-600 dark:text-surface-400 mb-4 text-sm"
      aria-live="polite"
      [attr.aria-atomic]="true"
      [attr.aria-label]="store.statusMessage()"
    >
      @if (store.gameOver()) {
        {{ store.statusMessage() }}
      } @else {
        <span
          class="font-medium"
          [class.text-primary]="store.currentPlayer() === 1"
          [class.text-amber-600]="store.currentPlayer() === 2"
          [class.dark:text-amber-400]="store.currentPlayer() === 2"
        >
          Player {{ store.currentPlayer() }}'s turn
        </span>
        – draw a line
      }
    </p>

    <div class="mb-4 flex gap-6 text-sm">
      <span class="font-medium text-surface-700 dark:text-surface-200">
        Player 1: <span class="text-primary font-bold">{{ store.score1() }}</span>
      </span>
      <span class="font-medium text-surface-700 dark:text-surface-200">
        Player 2: <span class="text-amber-600 dark:text-amber-400 font-bold">{{ store.score2() }}</span>
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsAndBoxesStatusComponent {
  protected readonly store = inject(DotsAndBoxesStore);
}
