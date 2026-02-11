import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-about-page',
  template: `<p class="p-4">About</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {}
