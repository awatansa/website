import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-tools-productivity',
  template: `<p class="p-4">Productivity Tools</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsProductivityFeature {}
