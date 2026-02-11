import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { LayoutComponent } from '@/commons/components';
import { GlobalStore } from '@/core/store';

@Component({
  selector: 'vy-root',
  imports: [RouterOutlet, ToggleSwitch, LayoutComponent],
  template: `
    <vy-layout>
      <header>
        <p-toggle-switch (onChange)="store.toggleDarkMode()" />
      </header>
      <main>
        <router-outlet />
      </main>
    </vy-layout>
  `,
})
export class App {
  protected readonly store = inject(GlobalStore)
}
