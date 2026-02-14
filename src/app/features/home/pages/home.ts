import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-home-page',
  template: `<p class="p-4">Home</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
