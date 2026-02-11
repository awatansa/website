import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-games-page',
  standalone: true,
  template: `<p class="p-4">Games</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesPage {}
