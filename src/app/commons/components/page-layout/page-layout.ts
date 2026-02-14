import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type PageLayoutMaxWidth = '2xl' | '4xl';

@Component({
  selector: 'vy-page-layout',
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mx-auto p-6"
      [class.max-w-2xl]="maxWidth() === '2xl'"
      [class.max-w-4xl]="maxWidth() === '4xl'"
    >
      @if (heading(); as headingText) {
        <h1
          class="text-surface-700 dark:text-surface-200 mb-2 text-2xl font-semibold"
          [id]="headingId() ?? undefined"
        >
          {{ headingText }}
        </h1>
      }

      @if (description(); as desc) {
        <p class="text-surface-600 dark:text-surface-400 mb-6 text-sm">
          {{ desc }}
        </p>
      }

      <ng-content />
    </div>
  `,
})
export class PageLayoutComponent {
  /** Page heading. */
  readonly heading = input<string | undefined>(undefined);
  /** Id for the heading element (for aria-labelledby on sections). */
  readonly headingId = input<string | undefined>(undefined);
  /** Short description below the heading. */
  readonly description = input<string | undefined>(undefined);
  /** Max width of the content area. */
  readonly maxWidth = input<PageLayoutMaxWidth>('2xl');
}
