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
      { label: 'Games', routerLink: '/games' },
      { label: 'Tools', routerLink: '/tools' },
      { label: 'About', routerLink: '/about' },
    ];
  }
}
