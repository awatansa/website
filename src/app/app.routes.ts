import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('@/pages/home').then((m) => m.HomePage) },
  {
    path: 'games',
    loadComponent: () => import('@/pages/games').then((m) => m.GamesPage),
    children: [
      {
        path: '',
        loadComponent: () => import('@/features/games/index').then((m) => m.GamesIndexFeature),
      },
      {
        path: 'casual',
        loadComponent: () => import('@/features/games/casual-layout').then((m) => m.GamesCasualLayout),
        children: [
          {
            path: '',
            loadComponent: () => import('@/features/games/casual').then((m) => m.GamesCasualFeature),
          },
          {
            path: 'tic-tac-toe',
            loadComponent: () => import('@/features/games/tic-tac-toe').then((m) => m.TicTacToeFeature),
          },
        ],
      },
      {
        path: 'puzzle',
        loadComponent: () => import('@/features/games/puzzle').then((m) => m.GamesPuzzleFeature),
      },
    ],
  },
  {
    path: 'tools',
    loadComponent: () => import('@/pages/tools').then((m) => m.ToolsPage),
    children: [
      {
        path: '',
        loadComponent: () => import('@/features/tools/index').then((m) => m.ToolsIndexFeature),
      },
      {
        path: 'productivity',
        loadComponent: () =>
          import('@/features/tools/productivity').then((m) => m.ToolsProductivityFeature),
      },
      {
        path: 'developer',
        loadComponent: () =>
          import('@/features/tools/developer').then((m) => m.ToolsDeveloperFeature),
      },
    ],
  },
  { path: 'about', loadComponent: () => import('@/pages/about').then((m) => m.AboutPage) },
];
