import { Injectable } from '@angular/core';
import type { MegaMenuItem } from 'primeng/api';

/**
 * Provides the header mega menu model under injection context.
 * Navigation items use routerLink. Settings (e.g. theme) are in the header end template.
 */
@Injectable({
  providedIn: 'root',
})
export class NavMenuConfig {
  private readonly model: MegaMenuItem[] = this.buildModel();

  getModel(): MegaMenuItem[] {
    return this.model;
  }

  private buildModel(): MegaMenuItem[] {
    return [
      { label: 'Home', routerLink: '/' },
      {
        label: 'Games',
        routerLink: '/games',
        items: [
          [
            {
              label: 'Games',
              items: [
                { label: 'Casual', routerLink: '/games/casual' },
                { label: 'Puzzle', routerLink: '/games/puzzle' },
              ],
            },
          ],
        ],
      },
      {
        label: 'Tools',
        routerLink: '/tools',
        items: [
          [
            {
              label: 'Tools',
              items: [
                { label: 'Productivity Tools', routerLink: '/tools/productivity' },
                { label: 'Developer Tools', routerLink: '/tools/developer' },
              ],
            },
          ],
        ],
      },
      { label: 'About', routerLink: '/about' },
    ];
  }
}
