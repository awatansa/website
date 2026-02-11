import { Injectable, inject } from '@angular/core';
import type { MegaMenuItem } from 'primeng/api';
import { GlobalStore } from '@/core/store';

/**
 * Provides the header mega menu model under injection context.
 * Navigation items use routerLink; settings expand to theme and other (future) options.
 */
@Injectable({
  providedIn: 'root',
})
export class NavMenuConfig {
  private readonly store = inject(GlobalStore);

  private readonly model: MegaMenuItem[] = this.buildModel();

  getModel(): MegaMenuItem[] {
    return this.model;
  }

  private buildModel(): MegaMenuItem[] {
    return [
      { label: 'Home', routerLink: '/' },
      { label: 'Games', routerLink: '/games' },
      { label: 'Tools', routerLink: '/tools' },
      { label: 'About', routerLink: '/about' },
      {
        icon: 'pi pi-cog',
        label: '',
        title: 'Settings',
        items: [
          [
            {
              label: 'Theme settings',
              command: () => this.store.toggleDarkMode(),
            },
            {
              label: 'Other settings',
              disabled: true,
            },
          ],
        ],
      },
    ];
  }
}
