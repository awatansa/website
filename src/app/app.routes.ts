import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('@/pages/home').then((m) => m.HomePage) },
  { path: 'games', loadComponent: () => import('@/pages/games').then((m) => m.GamesPage) },
  { path: 'tools', loadComponent: () => import('@/pages/tools').then((m) => m.ToolsPage) },
  { path: 'about', loadComponent: () => import('@/pages/about').then((m) => m.AboutPage) },
];
