import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { HeaderComponent, LayoutBreadcrumbComponent, LayoutComponent } from '@/commons/components';

@Component({
  selector: 'vy-root',
  imports: [RouterOutlet, Toast, LayoutComponent, HeaderComponent, LayoutBreadcrumbComponent],
  template: `
    <p-toast position="top-center" [life]="2000" />
    <ng-template #header>
      <vy-header />
    </ng-template>
    <ng-template #main>
      <div class="flex flex-col flex-1 min-h-0">
        <vy-layout-breadcrumb />
        <div class="flex-1 min-h-0 overflow-auto">
          <router-outlet />
        </div>
      </div>
    </ng-template>
    <vy-layout [headerTemplate]="header" [mainTemplate]="main" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
