import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'vy-layout',
  imports: [],
  host: {
    class: 'flex flex-col min-h-screen',
  },
  template: `
    <header class="shrink-0 sticky top-0 z-10">
      <ng-content select="vy-header" />
    </header>
    <main class="flex-1 min-h-0 overflow-auto">
      <ng-content />
    </main>
    <footer class="shrink-0 sticky bottom-0 z-10">
      <ng-content select="vy-footer" />
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
