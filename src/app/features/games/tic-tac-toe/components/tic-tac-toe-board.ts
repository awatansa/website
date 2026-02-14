import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicTacToeStore } from '@/features/games/tic-tac-toe/store';

@Component({
  selector: 'vy-tic-tac-toe',
  imports: [RouterLink],
  host: {
    'aria-label': 'Tic-Tac-Toe game',
  },
  template: `
    <div class="mx-auto max-w-md p-6">
      <nav class="mb-6" aria-label="Breadcrumb">
        <a
          routerLink="/games/casual"
          class="text-primary hover:underline"
          aria-label="Back to casual games"
        >
          ← Casual games
        </a>
      </nav>

      <h1 class="text-surface-700 mb-2 text-2xl font-semibold" id="ttt-heading">
        Tic-Tac-Toe
      </h1>

      <p
        class="text-surface-600 mb-6 text-sm"
        aria-live="polite"
        [attr.aria-atomic]="true"
        [attr.aria-label]="store.statusMessage()"
      >
        {{ store.statusMessage() }}
      </p>

      <div
        class="grid grid-cols-3 gap-2"
        role="grid"
        aria-label="Game board"
        aria-readonly="true"
      >
        @for (cell of store.board(); track $index) {
          <button
            type="button"
            class="flex aspect-square min-h-14 items-center justify-center rounded-lg border-2 border-surface-300 bg-surface-0 text-2xl font-bold transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            [class.border-primary]="cell !== ''"
            [class.bg-primary-50]="cell === 'X'"
            [class.bg-primary-100]="cell === 'O'"
            [disabled]="cell !== '' || store.gameOver()"
            [attr.aria-label]="getCellAriaLabel($index)"
            [attr.aria-rowindex]="getRowIndex($index)"
            [attr.aria-colindex]="getColIndex($index)"
            (click)="store.makeMove($index)"
          >
            {{ cell }}
          </button>
        }
      </div>

      <div class="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          class="rounded-lg border border-surface-300 bg-surface-0 px-4 py-2 font-medium hover:bg-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          (click)="store.reset()"
          aria-label="Start a new game"
        >
          New game
        </button>
        <a
          routerLink="/games/casual"
          class="inline-flex items-center rounded-lg border border-surface-300 bg-surface-0 px-4 py-2 font-medium hover:bg-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Back to casual games"
        >
          Back to casual games
        </a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicTacToeBoardComponent {
  protected readonly store = inject(TicTacToeStore);

  protected getRowIndex(index: number): number {
    return Math.floor(index / 3) + 1;
  }

  protected getColIndex(index: number): number {
    return (index % 3) + 1;
  }

  protected getCellAriaLabel(index: number): string {
    const board = this.store.board();
    const cell = board[index];
    const row = this.getRowIndex(index);
    const col = this.getColIndex(index);
    if (cell !== '') {
      return `Row ${row}, column ${col}, ${cell}`;
    }
    return `Row ${row}, column ${col}, empty. Click to place ${this.store.currentPlayer()}`;
  }
}
