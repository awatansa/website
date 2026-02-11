import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-games-casual',
  template: `<p class="p-4">Casual Games</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesCasualFeature {}
