import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/shell').then((m) => m.ShellComponent),
    children: [
      { path: '', loadComponent: () => import('@/features/home/pages/home').then((m) => m.HomePage) },
      {
        path: 'games',
        loadComponent: () => import('@/features/games/pages/games').then((m) => m.GamesPage),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@/features/games/components/index').then((m) => m.GamesIndexFeature),
          },
          {
            path: 'casual',
            loadComponent: () =>
              import('@/features/games/components/casual-layout').then((m) => m.GamesCasualLayout),
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('@/features/games/components/casual').then((m) => m.GamesCasualFeature),
              },
              {
                path: 'tic-tac-toe',
                loadComponent: () =>
                  import('@/features/games/tic-tac-toe').then((m) => m.TicTacToeFeature),
              },
              {
                path: 'dots-and-boxes',
                loadComponent: () =>
                  import('@/features/games/dots-and-boxes').then((m) => m.DotsAndBoxesFeature),
              },
            ],
          },
          {
            path: 'puzzle',
            loadComponent: () =>
              import('@/features/games/components/puzzle').then((m) => m.GamesPuzzleFeature),
          },
        ],
      },
      {
        path: 'tools',
        loadComponent: () => import('@/features/tools/pages/tools').then((m) => m.ToolsPage),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@/features/tools/components/index').then((m) => m.ToolsIndexFeature),
          },
          {
            path: 'productivity',
            loadComponent: () =>
              import('@/features/tools/components/productivity').then(
                (m) => m.ToolsProductivityFeature
              ),
          },
          {
            path: 'developer-tool',
            loadComponent: () =>
              import('@/features/tools/developer-tool/components/developer-tool-layout').then(
                (m) => m.DeveloperToolLayoutComponent
              ),
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('@/features/tools/developer-tool/pages/developer-tool-index').then(
                    (m) => m.DeveloperToolIndexPage
                  ),
              },
              {
                path: 'base32-encode-decode',
                loadComponent: () =>
                  import('@/features/tools/developer-tool/base32-encode-decode').then(
                    (m) => m.Base32EncodeDecodeFeature
                  ),
              },
              {
                path: 'base64-encode-decode',
                loadComponent: () =>
                  import('@/features/tools/developer-tool/base64-encode-decode').then(
                    (m) => m.Base64EncodeDecodeFeature
                  ),
              },
              {
                path: 'url-encode-decode',
                loadComponent: () =>
                  import('@/features/tools/developer-tool/url-encode-decode').then(
                    (m) => m.UrlEncodeDecodeFeature
                  ),
              },
              {
                path: 'password-generator',
                loadComponent: () =>
                  import('@/features/tools/developer-tool/password-generator').then(
                    (m) => m.PasswordGeneratorFeature
                  ),
              },
              {
                path: 'regex',
                loadComponent: () =>
                  import('@/features/tools/developer-tool/regex').then((m) => m.RegexCheckFeature),
              },
            ],
          },
        ],
      },
      {
        path: 'about',
        loadComponent: () => import('@/features/about/pages/about').then((m) => m.AboutPage),
      },
    ],
  },
];
