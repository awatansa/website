import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageLayoutComponent } from '@/commons/components';

const TOOLS: { path: string; label: string; description: string }[] = [
  { path: 'base32-encode-decode', label: 'Base32 Encode / Decode', description: 'Encode or decode text to Base32 (RFC 4648).' },
  { path: 'base64-encode-decode', label: 'Base64 Encode / Decode', description: 'Encode or decode text to Base64.' },
  { path: 'url-encode-decode', label: 'URL Encode / Decode', description: 'Encode or decode URL query strings.' },
  { path: 'password-generator', label: 'Password Generator', description: 'Generate cryptographically random passwords.' },
  { path: 'regex', label: 'Regular Expression Check', description: 'Test regex patterns and view matches.' },
];

@Component({
  selector: 'vy-developer-tool-index',
  imports: [RouterLink, PageLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vy-page-layout
      heading="Developer Tools"
      headingId="developer-tools-heading"
      description="Encoding, decoding, password generation, and regex testing."
    >
      <nav class="flex flex-col gap-3" aria-labelledby="developer-tools-heading">
        @for (tool of tools; track tool.path) {
          <a
            [routerLink]="tool.path"
            class="flex flex-col gap-1 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-4 no-underline text-surface-800 dark:text-surface-100 hover:border-primary-500 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
            [attr.aria-label]="'Open ' + tool.label"
          >
            <span class="font-medium">{{ tool.label }}</span>
            <span class="text-surface-600 dark:text-surface-400 text-sm">{{ tool.description }}</span>
          </a>
        }
      </nav>
    </vy-page-layout>
  `,
})
export class DeveloperToolIndexPage {
  protected readonly tools = TOOLS;
}
