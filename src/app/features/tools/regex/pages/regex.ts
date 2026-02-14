import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Panel } from 'primeng/panel';
import { Message } from 'primeng/message';
import { Button } from 'primeng/button';
import { RegexCheckStore } from '@/features/tools/regex/store';

const REGEX_GUIDE = [
  { tip: '. matches any character', example: '.' },
  { tip: '\\d digit, \\w word char, \\s whitespace', example: '\\d+' },
  { tip: '[abc] one of a,b,c; [^x] not x', example: '[a-z]+' },
  { tip: '(…) capturing group', example: '(\\w+)@(\\w+)' },
  { tip: '* zero+ more, + one+ more, ? zero or one', example: '\\d+' },
  { tip: '^ start, $ end (use with m for line boundaries)', example: '^\\w+' },
];

@Component({
  selector: 'vy-regex-check',
  imports: [
    RouterLink,
    FormsModule,
    InputText,
    Textarea,
    Panel,
    Message,
    Button,
  ],
  providers: [RegexCheckStore],
  host: {
    'aria-label': 'Regular expression checker tool',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-4xl p-6">
      <nav class="mb-6" aria-label="Breadcrumb">
        <a
          routerLink="/tools"
          class="text-primary hover:underline"
          aria-label="Back to tools"
        >
          ← Tools
        </a>
      </nav>

      <h1 class="text-surface-700 dark:text-surface-200 mb-2 text-2xl font-semibold" id="regex-heading">
        Regular Expression Check
      </h1>
      <p class="text-surface-600 dark:text-surface-400 mb-6 text-sm">
        Enter a regular expression and test text. Matches are highlighted; non-matching text is dimmed. View match count, capturing groups, and a short reference below.
      </p>

      <section class="mb-6 flex flex-col gap-4" aria-labelledby="inputs-heading">
        <h2 id="inputs-heading" class="text-surface-700 dark:text-surface-200 text-lg font-medium sr-only">
          Regex and test inputs
        </h2>

        <div class="flex flex-col gap-2">
          <label id="pattern-label" class="text-surface-700 dark:text-surface-200 text-sm font-medium" for="pattern-input">
            Regular expression
          </label>
          <div class="flex flex-wrap items-center gap-2">
            <input
              id="pattern-input"
              type="text"
              pInputText
              class="flex-1 min-w-0 font-mono text-sm"
              [ngModel]="store.pattern()"
              (ngModelChange)="store.setPattern($event)"
              placeholder="e.g. \\w+@\\w+\\.\\w+"
              [invalid]="!!store.regexError()"
              [attr.aria-invalid]="!!store.regexError()"
              aria-describedby="pattern-error"
              aria-labelledby="pattern-label"
            />
            <span class="text-surface-500 dark:text-surface-400 text-sm">/</span>
            <input
              id="flags-input"
              type="text"
              pInputText
              class="w-20 font-mono text-sm"
              [ngModel]="store.flags()"
              (ngModelChange)="store.setFlags($event)"
              placeholder="gm"
              maxlength="6"
              aria-label="Regex flags (e.g. g global, i ignore case, m multiline)"
            />
          </div>
          @if (store.regexError(); as err) {
            <p-message
              id="pattern-error"
              severity="error"
              [text]="err"
              variant="simple"
              class="text-sm"
              [attr.aria-live]="'polite'"
            />
          }
        </div>

        <div class="flex flex-col gap-2">
          <label id="test-label" class="text-surface-700 dark:text-surface-200 text-sm font-medium" for="test-textarea">
            Test text
          </label>
          <textarea
            id="test-textarea"
            pTextarea
            [ngModel]="store.testString()"
            (ngModelChange)="store.setTestString($event)"
            rows="6"
            fluid
            class="w-full resize-y font-mono text-sm"
            placeholder="Paste or type text to test against the regex…"
            aria-labelledby="test-label"
          ></textarea>
        </div>
      </section>

      <section
        class="mb-6"
        aria-labelledby="result-heading"
        aria-live="polite"
      >
        <h2 id="result-heading" class="text-surface-700 dark:text-surface-200 mb-2 text-lg font-medium">
          Match result
        </h2>
        <div
          class="min-h-[6rem] rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-4 font-mono text-sm leading-relaxed"
          [class.text-surface-500]="store.segments().length === 0"
          [class.dark:text-surface-400]="store.segments().length === 0"
        >
          @if (store.segments().length === 0 && store.testString() === '') {
            <span class="text-surface-500 dark:text-surface-400">Enter test text to see highlighted matches.</span>
          } @else {
            @for (seg of store.segments(); track $index) {
              @if (seg.isMatch) {
                <span class="rounded bg-primary-100 px-0.5 text-primary-900 dark:bg-primary-900/40 dark:text-primary-100">{{ seg.text }}</span>
              } @else {
                <span class="text-surface-500 dark:text-surface-400">{{ seg.text }}</span>
              }
            }
          }
        </div>
      </section>

      <div class="mb-6 grid gap-4 sm:grid-cols-2">
        <p-panel header="Statistics" [toggleable]="true">
          <ul class="list-none p-0 m-0 flex flex-col gap-2 text-surface-700 dark:text-surface-200 text-sm">
            <li>
              <span class="font-medium">Matches:</span>
              {{ store.matchCount() }}
            </li>
            <li>
              <span class="font-medium">Capturing groups (first match):</span>
              {{ store.groupCount() }}
            </li>
            @if (store.matches().length > 0 && store.matches()[0].groups.length > 0) {
              <li class="mt-2 flex flex-col gap-1">
                <span class="font-medium">Group values:</span>
                <ol class="list-decimal list-inside text-surface-600 dark:text-surface-400">
                  @for (g of store.matches()[0].groups; track $index) {
                    <li><code class="rounded bg-surface-100 dark:bg-surface-800 px-1">{{ g || '(empty)' }}</code></li>
                  }
                </ol>
              </li>
            }
          </ul>
        </p-panel>

        <p-panel header="Quick reference" [toggleable]="true">
          <ul class="list-none p-0 m-0 flex flex-col gap-1.5 text-surface-600 dark:text-surface-400 text-sm">
            @for (item of regexGuide; track item.tip) {
              <li>
                <span class="text-surface-700 dark:text-surface-200">{{ item.tip }}</span>
                <code class="ml-1 rounded bg-surface-100 dark:bg-surface-800 px-1 font-mono text-xs">{{ item.example }}</code>
              </li>
            }
          </ul>
        </p-panel>
      </div>

      <p-button
        label="Clear"
        icon="pi pi-trash"
        severity="secondary"
        (onClick)="store.clear()"
        [attr.aria-label]="'Clear regex, flags, and test text'"
      />
    </div>
  `,
})
export class RegexCheckFeature {
  protected readonly store = inject(RegexCheckStore);
  protected readonly regexGuide = REGEX_GUIDE;
}
