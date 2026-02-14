import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-games-index',
  template: `<p class="p-4">Games</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesIndexFeature {}
