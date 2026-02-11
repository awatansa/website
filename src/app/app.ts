import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, LayoutComponent } from '@/commons/components';

@Component({
  selector: 'vy-root',
  imports: [RouterOutlet, LayoutComponent, HeaderComponent],
  template: `
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
export class App { }
