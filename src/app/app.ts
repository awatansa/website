import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { GlobalStore } from '@/core/store';

@Component({
  selector: 'vy-root',
  imports: [RouterOutlet, ToggleSwitch],
  template: `
    <p-toggle-switch  (onChange)="store.toggleDarkMode()" />

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly store = inject(GlobalStore)
}
