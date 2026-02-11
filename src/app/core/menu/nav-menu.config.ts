import { Injectable } from '@angular/core';
import type { MenuItem } from 'primeng/api';

/**
 * Provides the header menubar model under injection context.
 * Navigation items use routerLink. Settings (e.g. theme) are in the header end template.
 */
@Injectable({
  providedIn: 'root',
})
export class NavMenuConfig {
  private readonly model: MenuItem[] = this.buildModel();

  getModel(): MenuItem[] {
    return this.model;
  }

  private buildModel(): MenuItem[] {
    return [
      { label: 'Home', routerLink: '/' },
      {
        label: 'Games',
        items: [
          {
            label: 'Casual',
            items: [
              { label: 'Tic-Tac-Toe', routerLink: '/games/casual/tic-tac-toe' },
            ],
          },
          { label: 'Puzzle', routerLink: '/games/puzzle' },
        ],
      },
      {
        label: 'Tools',
        items: [
          { label: 'Productivity Tools', routerLink: '/tools/productivity' },
          { label: 'Developer Tools', routerLink: '/tools/developer' },
        ],
      },
      { label: 'About', routerLink: '/about' },
    ];
  }
}
