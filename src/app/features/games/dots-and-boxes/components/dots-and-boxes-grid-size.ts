import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { DotsAndBoxesStore } from '@/features/games/dots-and-boxes/store';

const GRID_SIZE_OPTIONS: { label: string; value: number }[] = [
  { label: '2×2', value: 2 },
  { label: '3×3', value: 3 },
  { label: '4×4', value: 4 },
  { label: '5×5', value: 5 },
];

@Component({
  selector: 'vy-dots-and-boxes-grid-size',
  imports: [SelectButton, FormsModule],
  host: {
    'aria-label': 'Grid size selection',
  },
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <label for="grid-size" class="text-surface-700 dark:text-surface-200 text-sm font-medium">
        Grid size
      </label>
      <p-selectButton
        id="grid-size"
        [options]="gridSizeOptions"
        optionLabel="label"
        optionValue="value"
        [ngModel]="store.rows()"
        (ngModelChange)="onGridSizeChange($event)"
        aria-label="Choose grid size (number of boxes per side)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsAndBoxesGridSizeComponent {
  protected readonly store = inject(DotsAndBoxesStore);
  protected readonly gridSizeOptions = GRID_SIZE_OPTIONS;

  protected onGridSizeChange(size: number): void {
    this.store.setGridSize(size, size);
  }
}
