import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import type { MenuItem } from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { Menubar } from 'primeng/menubar';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NavMenuConfig } from '@/core/menu/nav-menu.config';
import { GlobalStore } from '@/core/store';

@Component({
  selector: 'vy-header',
  imports: [Menubar, RouterModule, PrimeTemplate, ToggleSwitch, FormsModule, Menu, Button],
  host: {
    class:
      'flex w-full items-center',
  },
  template: `
    <p-menubar
      [model]="menuModel"
      class="w-full border-0 rounded-none"
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
          <p-button
            icon="pi pi-cog"
            [ariaLabel]="'Settings'"
            [attr.aria-haspopup]="'menu'"
            [attr.aria-expanded]="settingsMenuVisible()"
            (onClick)="settingsMenu.toggle($event)"
          />
        </div>
      </ng-template>
    </p-menubar>
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
