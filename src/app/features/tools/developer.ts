import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-tools-developer',
  template: `<p class="p-4">Developer Tools</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsDeveloperFeature {}
