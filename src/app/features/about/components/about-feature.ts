import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { AboutStore } from '@/features/about/store';

@Component({
  selector: 'vy-about-feature',
  imports: [Card, Tag],
  host: {
    'aria-label': 'About',
  },
  template: `
    <div class="bg-surface-50 px-6 py-8">
      @if (store.data(); as about) {
        <section class="mx-auto max-w-2xl" aria-labelledby="about-intro-heading">
          <h1 id="about-intro-heading" class="text-surface-700 mb-4 text-3xl font-semibold">
            {{ about.intro.title }}
          </h1>
          <p class="text-surface-600 text-lg leading-relaxed">
            {{ about.intro.description }}
          </p>
        </section>

        <div class="mx-auto mt-10 max-w-2xl space-y-6">
          @for (group of about.skillGroups; track group.slug) {
            <section
              [attr.aria-labelledby]="'about-' + group.slug + '-heading'"
            >
              <p-card class="border border-surface-200 bg-surface-0 shadow-sm">
                <ng-template pTemplate="header">
                  <h2
                    [id]="'about-' + group.slug + '-heading'"
                    class="text-primary border-surface-200 border-b px-4 py-3 text-xl font-semibold"
                  >
                    {{ group.title }}
                  </h2>
                </ng-template>
                <div class="flex flex-wrap gap-2 px-4 pb-4 pt-2">
                  @for (skill of group.skills; track skill) {
                    <p-tag [value]="skill" [rounded]="true" />
                  }
                </div>
              </p-card>
            </section>
          }
        </div>
      } @else if (store.error()) {
        <p class="text-surface-600 mx-auto max-w-2xl" role="alert">
          {{ store.error() }}
        </p>
      } @else {
        <p class="text-surface-600 mx-auto max-w-2xl" aria-busy="true">
          Loading…
        </p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutFeatureComponent {
  protected readonly store = inject(AboutStore);
}
