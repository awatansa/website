import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DotsAndBoxesStore } from '@/features/games/dots-and-boxes/store';
import { getCellType } from '@/features/games/dots-and-boxes/store/dots-and-boxes-grid.utils';

@Component({
  selector: 'vy-dots-and-boxes-cell',
  template: `
    @if (cellType() === 'dot') {
      <span
        class="inline-block h-4 min-h-4 w-4 min-w-4 shrink-0 rounded-full bg-surface-700 dark:bg-surface-400"
        [attr.data-row]="rowIndex()"
        [attr.data-col]="colIndex()"
      ></span>
    } @else if (cellType() === 'horizontalEdge') {
      <button
        type="button"
        class="h-4 min-w-20 rounded-sm border-2 border-transparent transition-colors hover:border-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
        [class.border-primary]="horizontalOwner() === 1"
        [class.bg-primary]="horizontalOwner() === 1"
        [class.border-amber-500]="horizontalOwner() === 2"
        [class.bg-amber-500]="horizontalOwner() === 2"
        [class.focus:ring-primary]="store.currentPlayer() === 1"
        [class.focus:ring-amber-500]="store.currentPlayer() === 2"
        [disabled]="horizontalOwner() !== null || store.gameOver()"
        [attr.aria-label]="store.getHorizontalEdgeAriaLabel(rowIndex(), colIndex())"
        (click)="store.claimHorizontalEdgeAt(rowIndex(), colIndex())"
      ></button>
    } @else if (cellType() === 'verticalEdge') {
      <button
        type="button"
        class="min-h-20 w-4 rounded-sm border-2 border-transparent transition-colors hover:border-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
        [class.border-primary]="verticalOwner() === 1"
        [class.bg-primary]="verticalOwner() === 1"
        [class.border-amber-500]="verticalOwner() === 2"
        [class.bg-amber-500]="verticalOwner() === 2"
        [class.focus:ring-primary]="store.currentPlayer() === 1"
        [class.focus:ring-amber-500]="store.currentPlayer() === 2"
        [disabled]="verticalOwner() !== null || store.gameOver()"
        [attr.aria-label]="store.getVerticalEdgeAriaLabel(rowIndex(), colIndex())"
        (click)="store.claimVerticalEdgeAt(rowIndex(), colIndex())"
      ></button>
    } @else {
      <span
        class="inline-block min-h-20 min-w-20 rounded-sm"
        [class.bg-primary-50]="boxOwner() === 1"
        [class.dark:bg-primary-900/40]="boxOwner() === 1"
        [class.bg-amber-50]="boxOwner() === 2"
        [class.dark:bg-amber-900/40]="boxOwner() === 2"
        [attr.data-box-row]="(rowIndex() - 1) / 2"
        [attr.data-box-col]="(colIndex() - 1) / 2"
      ></span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsAndBoxesCellComponent {
  protected readonly store = inject(DotsAndBoxesStore);
  readonly rowIndex = input.required<number>();
  readonly colIndex = input.required<number>();

  /** Use pure grid util so cell type is correct. */
  protected cellType = computed(() =>
    getCellType(this.rowIndex(), this.colIndex())
  );

  /** Computeds that read store signals so OnPush re-renders when edges/boxes change. */
  protected horizontalOwner = computed(() => {
    this.store.horizontalEdges();
    return this.store.getHorizontalOwner(this.rowIndex(), this.colIndex());
  });

  protected verticalOwner = computed(() => {
    this.store.verticalEdges();
    return this.store.getVerticalOwner(this.rowIndex(), this.colIndex());
  });

  protected boxOwner = computed(() => {
    this.store.boxes();
    return this.store.getBoxOwner(this.rowIndex(), this.colIndex());
  });
}
