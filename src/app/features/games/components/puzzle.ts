import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-games-puzzle',
  template: `<p class="p-4">Puzzle Games</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesPuzzleFeature {}
