import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

interface CasualGame {
  title: string;
  description: string;
  routerLink: string;
}

@Component({
  selector: 'vy-games-casual',
  imports: [RouterLink, Card, Button],
  host: {
    'aria-label': 'Casual games',
  },
  template: `
    <div class="p-6">
      <h1 class="text-surface-700 mb-6 text-2xl font-semibold" id="casual-heading">
        Casual Games
      </h1>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @for (game of casualGames; track game.routerLink) {
          <p-card class="border border-surface-200 shadow-sm">
            <ng-template pTemplate="header">
              <h2 class="text-surface-700 px-4 py-3 text-lg font-medium">
                {{ game.title }}
              </h2>
            </ng-template>
            <p class="text-surface-600 px-4 pb-2 text-sm">{{ game.description }}</p>
            <ng-template pTemplate="footer">
              <p-button
                [routerLink]="game.routerLink"
                label="Play"
                icon="pi pi-play"
                iconPos="left"
                [attr.aria-label]="'Play ' + game.title"
              />
            </ng-template>
          </p-card>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesCasualFeature {
  protected readonly casualGames: CasualGame[] = [
    {
      title: 'Tic-Tac-Toe',
      description: 'Classic 3×3 grid. Get three in a row to win.',
      routerLink: '/games/casual/tic-tac-toe',
    },
  ];
}
