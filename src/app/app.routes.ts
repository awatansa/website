import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('@/features/home/pages/home').then((m) => m.HomePage) },
  {
    path: 'games',
    loadComponent: () => import('@/features/games/pages/games').then((m) => m.GamesPage),
    children: [
      {
        path: '',
        loadComponent: () => import('@/features/games/components/index').then((m) => m.GamesIndexFeature),
      },
      {
        path: 'casual',
        loadComponent: () => import('@/features/games/components/casual-layout').then((m) => m.GamesCasualLayout),
        children: [
          {
            path: '',
            loadComponent: () => import('@/features/games/components/casual').then((m) => m.GamesCasualFeature),
          },
          {
            path: 'tic-tac-toe',
            loadComponent: () => import('@/features/games/components/tic-tac-toe').then((m) => m.TicTacToeFeature),
          },
        ],
      },
      {
        path: 'puzzle',
        loadComponent: () => import('@/features/games/components/puzzle').then((m) => m.GamesPuzzleFeature),
      },
    ],
  },
  {
    path: 'tools',
    loadComponent: () => import('@/features/tools/pages/tools').then((m) => m.ToolsPage),
    children: [
      {
        path: '',
        loadComponent: () => import('@/features/tools/components/index').then((m) => m.ToolsIndexFeature),
      },
      {
        path: 'productivity',
        loadComponent: () =>
          import('@/features/tools/components/productivity').then((m) => m.ToolsProductivityFeature),
      },
      {
        path: 'developer',
        loadComponent: () =>
          import('@/features/tools/components/developer').then((m) => m.ToolsDeveloperFeature),
      },
    ],
  },
  { path: 'about', loadComponent: () => import('@/features/about/pages/about').then((m) => m.AboutPage) },
];
