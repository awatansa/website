import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { DotsAndBoxesStore } from '@/features/games/dots-and-boxes/store';

@Component({
  selector: 'vy-dots-and-boxes',
  imports: [RouterLink, Button],
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

      <p
        class="text-surface-600 dark:text-surface-400 mb-4 text-sm"
        aria-live="polite"
        [attr.aria-atomic]="true"
        [attr.aria-label]="store.statusMessage()"
      >
        {{ store.statusMessage() }}
      </p>

      <div class="mb-4 flex gap-6 text-sm">
        <span class="font-medium text-surface-700 dark:text-surface-200">
          Player 1: <span class="text-primary font-bold">{{ store.score1() }}</span>
        </span>
        <span class="font-medium text-surface-700 dark:text-surface-200">
          Player 2: <span class="text-primary font-bold">{{ store.score2() }}</span>
        </span>
      </div>

      <div
        class="inline-grid gap-0 border border-surface-300 dark:border-surface-600 bg-surface-0 dark:bg-surface-900 p-2"
        [style.grid-template-rows]="gridRows()"
        [style.grid-template-columns]="gridCols()"
        role="grid"
        [attr.aria-label]="'Game board, ' + store.rows() + ' by ' + store.cols() + ' boxes'"
      >
        @for (i of rowIndices(); track i) {
          @for (j of colIndices(); track j) {
            @if (isDot(i, j)) {
              <span
                class="h-3 w-3 rounded-full bg-surface-700 dark:bg-surface-400"
                [attr.aria-hidden]="true"
                [attr.data-row]="i"
                [attr.data-col]="j"
              ></span>
            } @else if (isHorizontalEdge(i, j)) {
              <button
                type="button"
                class="h-3 min-w-12 rounded-sm border-2 border-transparent transition-colors hover:border-primary hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
                [class.border-primary]="getHorizontalOwner(i, j) !== null"
                [class.bg-primary]="getHorizontalOwner(i, j) !== null"
                [disabled]="getHorizontalOwner(i, j) !== null || store.gameOver()"
                [attr.aria-label]="getHorizontalEdgeAriaLabel(i, j)"
                (click)="store.claimHorizontalEdge(i / 2, (j - 1) / 2)"
              ></button>
            } @else if (isVerticalEdge(i, j)) {
              <button
                type="button"
                class="min-h-12 w-3 rounded-sm border-2 border-transparent transition-colors hover:border-primary hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
                [class.border-primary]="getVerticalOwner(i, j) !== null"
                [class.bg-primary]="getVerticalOwner(i, j) !== null"
                [disabled]="getVerticalOwner(i, j) !== null || store.gameOver()"
                [attr.aria-label]="getVerticalEdgeAriaLabel(i, j)"
                (click)="store.claimVerticalEdge((i - 1) / 2, j / 2)"
              ></button>
            } @else {
              <span
                class="min-h-12 min-w-12 rounded-sm"
                [class.bg-primary-50]="getBoxOwner((i - 1) / 2, (j - 1) / 2) === 1"
                [class.dark:bg-primary-900/40]="getBoxOwner((i - 1) / 2, (j - 1) / 2) === 1"
                [class.bg-primary-100]="getBoxOwner((i - 1) / 2, (j - 1) / 2) === 2"
                [class.dark:bg-primary-800/50]="getBoxOwner((i - 1) / 2, (j - 1) / 2) === 2"
                [attr.aria-hidden]="true"
                [attr.data-box-row]="(i - 1) / 2"
                [attr.data-box-col]="(j - 1) / 2"
              ></span>
            }
          }
        }
      </div>

      <div class="mt-6 flex flex-wrap gap-3">
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsAndBoxesBoardComponent {
  protected readonly store = inject(DotsAndBoxesStore);

  protected gridRows(): string {
    const rows = this.store.rows();
    return `repeat(${2 * rows + 1}, auto)`;
  }

  protected gridCols(): string {
    const cols = this.store.cols();
    return `repeat(${2 * cols + 1}, auto)`;
  }

  protected rowIndices(): number[] {
    const rows = this.store.rows();
    return Array.from({ length: 2 * rows + 1 }, (_, i) => i);
  }

  protected colIndices(): number[] {
    const cols = this.store.cols();
    return Array.from({ length: 2 * cols + 1 }, (_, i) => i);
  }

  protected isDot(i: number, j: number): boolean {
    return i % 2 === 0 && j % 2 === 0;
  }

  protected isHorizontalEdge(i: number, j: number): boolean {
    return i % 2 === 0 && j % 2 === 1;
  }

  protected isVerticalEdge(i: number, j: number): boolean {
    return i % 2 === 1 && j % 2 === 0;
  }

  protected getHorizontalOwner(i: number, j: number): 1 | 2 | null {
    const row = i / 2;
    const col = (j - 1) / 2;
    const cols = this.store.cols();
    const idx = row * cols + col;
    return this.store.horizontalEdges()[idx];
  }

  protected getVerticalOwner(i: number, j: number): 1 | 2 | null {
    const row = (i - 1) / 2;
    const col = j / 2;
    const cols = this.store.cols();
    const idx = row * (cols + 1) + col;
    return this.store.verticalEdges()[idx];
  }

  protected getBoxOwner(boxRow: number, boxCol: number): 1 | 2 | null {
    const cols = this.store.cols();
    return this.store.boxes()[boxRow * cols + boxCol];
  }

  protected getHorizontalEdgeAriaLabel(i: number, j: number): string {
    const owner = this.getHorizontalOwner(i, j);
    if (owner !== null) return `Line claimed by Player ${owner}`;
    if (this.store.gameOver()) return 'Game over';
    return `Draw line – Player ${this.store.currentPlayer()}'s turn`;
  }

  protected getVerticalEdgeAriaLabel(i: number, j: number): string {
    const owner = this.getVerticalOwner(i, j);
    if (owner !== null) return `Line claimed by Player ${owner}`;
    if (this.store.gameOver()) return 'Game over';
    return `Draw line – Player ${this.store.currentPlayer()}'s turn`;
  }
}
