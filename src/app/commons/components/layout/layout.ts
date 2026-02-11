import {
  ChangeDetectionStrategy,
  Component,
  input,
  type TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'vy-layout',
  imports: [NgTemplateOutlet],
  host: {
    class: 'flex flex-col min-h-screen',
  },
  template: `
    <header class="shrink-0 sticky top-0 z-10">
      @if (headerTemplate()) {
        <ng-container [ngTemplateOutlet]="headerTemplate()!" />
      }
    </header>
    <main class="flex-1 min-h-0 overflow-auto">
      @if (mainTemplate()) {
        <ng-container [ngTemplateOutlet]="mainTemplate()!" />
      }
    </main>
    <footer class="shrink-0 sticky bottom-0 z-10">
      @if (footerTemplate()) {
        <ng-container [ngTemplateOutlet]="footerTemplate()!" />
      }
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  /** Slot from ng-template #header. */
  readonly headerTemplate = input<TemplateRef<unknown>>();
  /** Slot from ng-template #main (e.g. router-outlet). */
  readonly mainTemplate = input<TemplateRef<unknown>>();
  /** Slot from ng-template #footer. */
  readonly footerTemplate = input<TemplateRef<unknown>>();
}
