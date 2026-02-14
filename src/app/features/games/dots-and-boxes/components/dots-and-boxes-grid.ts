import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DotsAndBoxesStore } from '@/features/games/dots-and-boxes/store';
import { DotsAndBoxesCellComponent } from '@/features/games/dots-and-boxes/components/dots-and-boxes-cell';

@Component({
  selector: 'vy-dots-and-boxes-grid',
  imports: [DotsAndBoxesCellComponent],
  template: `
    <div
      class="inline-grid gap-0 border border-surface-300 dark:border-surface-600 bg-surface-0 dark:bg-surface-900 p-2"
      role="grid"
      [style.grid-template-rows]="store.gridRows()"
      [style.grid-template-columns]="store.gridCols()"
      [attr.aria-label]="store.gridAriaLabel()"
    >
      @for (i of store.rowIndices(); track i) {
        @for (j of store.colIndices(); track j) {
          <vy-dots-and-boxes-cell [rowIndex]="i" [colIndex]="j" />
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsAndBoxesGridComponent {
  protected readonly store = inject(DotsAndBoxesStore);
}
