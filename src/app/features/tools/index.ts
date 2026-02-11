import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-tools-index',
  template: `<p class="p-4">Tools</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsIndexFeature {}
