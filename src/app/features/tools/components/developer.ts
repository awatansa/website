import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-tools-developer',
  template: `<p class="p-4 text-surface-700 dark:text-surface-200">Developer Tools</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsDeveloperFeature {}
