import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DotsAndBoxesStore } from '@/features/games/dots-and-boxes/store';
import { DotsAndBoxesBoardComponent } from '@/features/games/dots-and-boxes/components/dots-and-boxes-board';

@Component({
  selector: 'vy-dots-and-boxes-feature',
  imports: [DotsAndBoxesBoardComponent],
  providers: [DotsAndBoxesStore],
  template: `<vy-dots-and-boxes />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsAndBoxesFeature {}
