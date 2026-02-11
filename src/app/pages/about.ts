import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutDataService, AboutFeatureComponent, AboutStore } from '@/features/about';

@Component({
  selector: 'vy-about-page',
  imports: [AboutFeatureComponent],
  providers: [AboutDataService, AboutStore],
  template: `<vy-about-feature />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {}
