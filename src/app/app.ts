import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { HeaderComponent, LayoutComponent } from '@/commons/components';

@Component({
  selector: 'vy-root',
  imports: [RouterOutlet, Toast, LayoutComponent, HeaderComponent],
  template: `
    <p-toast position="top-center" [life]="2000" />
    <ng-template #header>
      <vy-header />
    </ng-template>
    <ng-template #main>
      <router-outlet />
    </ng-template>
    <vy-layout [headerTemplate]="header" [mainTemplate]="main" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
