import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';

export type PageLayoutMaxWidth = '2xl' | '4xl';

@Component({
  selector: 'vy-page-layout',
  imports: [RouterModule, Breadcrumb],
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
      @if (breadcrumbModel().length > 0) {
        <p-breadcrumb
          [model]="breadcrumbModel()"
          class="mb-6"
          [attr.aria-label]="'Breadcrumb'"
        />
      }

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
  /** Router link for the breadcrumb back link (e.g. '/tools'). Omit to hide breadcrumb. */
  readonly backLink = input<string | undefined>(undefined);
  /** Label for the back link (e.g. 'Tools'). */
  readonly backLabel = input<string | undefined>(undefined);
  /** Page heading. */
  readonly heading = input<string | undefined>(undefined);
  /** Id for the heading element (for aria-labelledby on sections). */
  readonly headingId = input<string | undefined>(undefined);
  /** Short description below the heading. */
  readonly description = input<string | undefined>(undefined);
  /** Max width of the content area. */
  readonly maxWidth = input<PageLayoutMaxWidth>('2xl');

  protected readonly breadcrumbModel = computed<MenuItem[]>(() => {
    const link = this.backLink();
    if (!link) return [];
    const items: MenuItem[] = [
      { label: this.backLabel() ?? 'Back', routerLink: link },
    ];
    const h = this.heading();
    if (h) items.push({ label: h });
    return items;
  });
}
