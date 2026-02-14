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
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      {
        label: 'Games',
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Casual',
            icon: 'pi pi-play',
            items: [
              { label: 'Tic-Tac-Toe', icon: 'pi pi-stop', routerLink: '/games/casual/tic-tac-toe' },
              {
                label: 'Dots and Boxes',
                icon: 'pi pi-th-large',
                routerLink: '/games/casual/dots-and-boxes',
              },
            ],
          },
          { label: 'Puzzle', icon: 'pi pi-puzzle-piece', routerLink: '/games/puzzle' },
        ],
      },
      {
        label: 'Tools',
        icon: 'pi pi-wrench',
        items: [
          { label: 'Productivity Tools', icon: 'pi pi-briefcase', routerLink: '/tools/productivity' },
          {
            label: 'Developer Tools',
            icon: 'pi pi-code',
            items: [
              {
                label: 'Developer Tools Home',
                icon: 'pi pi-list',
                routerLink: '/tools/developer-tool',
              },
              {
                label: 'Base64 Encode / Decode',
                icon: 'pi pi-key',
                routerLink: '/tools/developer-tool/base64-encode-decode',
              },
              {
                label: 'URL Encode / Decode',
                icon: 'pi pi-link',
                routerLink: '/tools/developer-tool/url-encode-decode',
              },
              {
                label: 'Password Generator',
                icon: 'pi pi-lock',
                routerLink: '/tools/developer-tool/password-generator',
              },
              {
                label: 'Regular Expression Check',
                icon: 'pi pi-search',
                routerLink: '/tools/developer-tool/regex',
              },
            ],
          },
        ],
      },
      { label: 'About', icon: 'pi pi-info-circle', routerLink: '/about' },
    ];
  }
}
