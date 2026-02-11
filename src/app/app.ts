import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, LayoutComponent } from '@/commons/components';

@Component({
  selector: 'vy-root',
  imports: [RouterOutlet, LayoutComponent, HeaderComponent],
  template: `
    <vy-layout>
      <header>
        <vy-header />
      </header>
      <main>
        <router-outlet />
      </main>
    </vy-layout>
  `,
})
export class App {}
