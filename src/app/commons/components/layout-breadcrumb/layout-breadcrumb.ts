import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import type { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { getBreadcrumbLabel } from '@/core/menu/breadcrumb.config';

@Component({
  selector: 'vy-layout-breadcrumb',
  imports: [RouterModule, Breadcrumb],
  host: {
    class: 'block shrink-0',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (breadcrumbModel().length > 0) {
      <nav class="bg-surface-0 dark:bg-surface-900 px-4 py-1.5 text-sm" aria-label="Breadcrumb">
        <p-breadcrumb
          [model]="breadcrumbModel()"
          [attr.aria-label]="'Breadcrumb'"
        />
      </nav>
    }
  `,
})
export class LayoutBreadcrumbComponent {
  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  /** Build breadcrumb items from current route path. Empty when at top level (0 or 1 segment). */
  protected readonly breadcrumbModel = computed<MenuItem[]>(() => {
    const url = this.currentUrl() ?? this.router.url;
    const path = url.split('?')[0];
    const segments = path.split('/').filter(Boolean);
    if (segments.length < 2) {
      return [];
    }
    const items: MenuItem[] = [
      { label: getBreadcrumbLabel(''), routerLink: '/' },
    ];
    let acc = '';
    for (let i = 0; i < segments.length; i++) {
      acc += '/' + segments[i];
      const label = getBreadcrumbLabel(segments[i]);
      const isLast = i === segments.length - 1;
      items.push(
        isLast
          ? { label }
          : { label, routerLink: acc }
      );
    }
    return items;
  });
}
