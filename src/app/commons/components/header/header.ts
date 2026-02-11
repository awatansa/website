import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import type { MenuItem } from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { MegaMenu } from 'primeng/megamenu';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NavMenuConfig } from '@/core/menu/nav-menu.config';
import { GlobalStore } from '@/core/store';

@Component({
  selector: 'vy-header',
  imports: [MegaMenu, RouterModule, PrimeTemplate, ToggleSwitch, FormsModule, Menu],
  host: {
    class: 'flex w-full items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
  },
  template: `
    <p-megaMenu
      [model]="menuModel"
      orientation="horizontal"
      class="w-full border-0 rounded-none bg-transparent [&_.p-megamenu-root-list]:flex [&_.p-megamenu-root-list]:flex-wrap [&_.p-megamenu-root-list]:gap-0 [&_.p-megamenu-root-list]:border-0 [&_.p-megamenu-root-list]:bg-transparent [&_.p-megamenu-item]:border-0 [&_.p-megamenu-submenu-label]:border-0"
      [attr.aria-label]="'Main navigation'"
    >
      <ng-template pTemplate="end">
        <div class="flex items-center">
          <p-menu
            #settingsMenu
            [model]="settingsMenuModel"
            [popup]="true"
            [attr.aria-label]="'Settings menu'"
            (onShow)="settingsMenuVisible.set(true)"
            (onHide)="settingsMenuVisible.set(false)"
          >
            <ng-template pTemplate="item" let-item>
              <div
                class="flex items-center justify-between gap-4 px-3 py-2 min-w-[12rem]"
                (click)="$event.stopPropagation()"
              >
                <span class="text-sm" id="settings-theme-label">{{ item.label }}</span>
                <p-toggleswitch
                  [ngModel]="store.theme() === 'dark'"
                  (onChange)="onThemeChange($event)"
                  inputId="theme-toggle"
                  ariaLabel="Toggle dark mode"
                  ariaLabelledBy="settings-theme-label"
                />
              </div>
            </ng-template>
          </p-menu>
          <button
            type="button"
            class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
            [attr.aria-label]="'Settings'"
            [attr.aria-haspopup]="'menu'"
            [attr.aria-expanded]="settingsMenuVisible()"
            (click)="settingsMenu.toggle($event)"
          >
            <span class="pi pi-cog" aria-hidden="true"></span>
          </button>
        </div>
      </ng-template>
    </p-megaMenu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly navMenuConfig = inject(NavMenuConfig);
  protected readonly store = inject(GlobalStore);
  protected readonly settingsMenu = viewChild<Menu>('settingsMenu');
  protected readonly settingsMenuVisible = signal(false);

  protected readonly settingsMenuModel: MenuItem[] = [{ label: 'Dark mode' }];

  protected get menuModel() {
    return this.navMenuConfig.getModel();
  }

  protected onThemeChange(event: { checked: boolean }): void {
    this.store.setTheme(event.checked ? 'dark' : 'light');
  }
}
