import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MegaMenu } from 'primeng/megamenu';
import { NavMenuConfig } from '@/core/menu/nav-menu.config';

@Component({
  selector: 'vy-header',
  imports: [MegaMenu, RouterModule],
  host: {
    class: 'flex w-full items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
  },
  template: `
    <p-megaMenu
      [model]="menuModel"
      orientation="horizontal"
      class="w-full border-0 rounded-none bg-transparent [&_.p-megamenu-root-list]:flex [&_.p-megamenu-root-list]:flex-wrap [&_.p-megamenu-root-list]:gap-0 [&_.p-megamenu-root-list]:border-0 [&_.p-megamenu-root-list]:bg-transparent [&_.p-megamenu-item]:border-0 [&_.p-megamenu-submenu-label]:border-0"
      [attr.aria-label]="'Main navigation'"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly navMenuConfig = inject(NavMenuConfig);

  protected get menuModel() {
    return this.navMenuConfig.getModel();
  }
}
