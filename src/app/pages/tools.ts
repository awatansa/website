import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vy-tools-page',
  standalone: true,
  template: `<p class="p-4">Tools</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsPage {}
