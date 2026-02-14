import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { PasswordGeneratorStore } from '@/features/tools/password-generator/store';

@Component({
  selector: 'vy-password-generator',
  imports: [
    RouterLink,
    FormsModule,
    Button,
    InputNumber,
    Checkbox,
    InputText,
    Message,
  ],
  providers: [PasswordGeneratorStore],
  host: {
    'aria-label': 'Password generator tool',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-2xl p-6">
      <nav class="mb-6" aria-label="Breadcrumb">
        <a
          routerLink="/tools"
          class="text-primary hover:underline"
          aria-label="Back to tools"
        >
          ← Tools
        </a>
      </nav>

      <h1 class="text-surface-700 mb-2 text-2xl font-semibold" id="pwgen-heading">
        Password Generator
      </h1>
      <p class="text-surface-600 mb-6 text-sm">
        Generate cryptographically random passwords. Choose how many to generate, length, and which character types to include.
      </p>

      <section class="mb-6 flex flex-col gap-4" aria-labelledby="options-heading">
        <h2 id="options-heading" class="text-surface-700 text-lg font-medium sr-only">
          Generator options
        </h2>

        <div class="flex flex-col gap-2">
          <label id="count-label" class="text-surface-700 text-sm font-medium" for="count-input">
            Number of passwords
          </label>
          <p-inputnumber
            inputId="count-input"
            [ngModel]="store.count()"
            (ngModelChange)="store.setCount($event)"
            [min]="1"
            [max]="50"
            [showButtons]="true"
            mode="decimal"
            [minFractionDigits]="0"
            [maxFractionDigits]="0"
            [aria-labelledby]="'count-label'"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label id="length-label" class="text-surface-700 text-sm font-medium" for="length-input">
            Password length
          </label>
          <p-inputnumber
            inputId="length-input"
            [ngModel]="store.length()"
            (ngModelChange)="store.setLength($event)"
            [min]="8"
            [max]="128"
            [showButtons]="true"
            mode="decimal"
            [minFractionDigits]="0"
            [maxFractionDigits]="0"
            [aria-labelledby]="'length-label'"
          />
        </div>

        <fieldset class="flex flex-col gap-2 border-0 p-0" aria-describedby="chars-desc">
          <legend class="text-surface-700 text-sm font-medium">
            Character types to include
          </legend>
          <span id="chars-desc" class="text-surface-600 text-xs">
            Select at least one.
          </span>
          <div class="mt-2 flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <p-checkbox
                inputId="opt-lower"
                [binary]="true"
                [ngModel]="store.includeLowercase()"
                (ngModelChange)="store.setIncludeLowercase($event)"
                [attr.aria-label]="'Include lowercase letters a–z'"
              />
              <label for="opt-lower" class="text-surface-700 text-sm cursor-pointer">
                Lowercase (a–z)
              </label>
            </div>
            <div class="flex items-center gap-2">
              <p-checkbox
                inputId="opt-upper"
                [binary]="true"
                [ngModel]="store.includeUppercase()"
                (ngModelChange)="store.setIncludeUppercase($event)"
                [attr.aria-label]="'Include uppercase letters A–Z'"
              />
              <label for="opt-upper" class="text-surface-700 text-sm cursor-pointer">
                Uppercase (A–Z)
              </label>
            </div>
            <div class="flex items-center gap-2">
              <p-checkbox
                inputId="opt-numbers"
                [binary]="true"
                [ngModel]="store.includeNumbers()"
                (ngModelChange)="store.setIncludeNumbers($event)"
                [attr.aria-label]="'Include digits 0–9'"
              />
              <label for="opt-numbers" class="text-surface-700 text-sm cursor-pointer">
                Numbers (0–9)
              </label>
            </div>
            <div class="flex items-center gap-2">
              <p-checkbox
                inputId="opt-symbols"
                [binary]="true"
                [ngModel]="store.includeSymbols()"
                (ngModelChange)="store.setIncludeSymbols($event)"
                [attr.aria-label]="'Include symbols'"
              />
              <label for="opt-symbols" class="text-surface-700 text-sm cursor-pointer">
                Symbols
              </label>
            </div>
          </div>
        </fieldset>

        <div class="flex flex-col gap-2">
          <label id="custom-symbols-label" class="text-surface-700 text-sm font-medium" for="custom-symbols-input">
            Special characters to include
          </label>
          <span class="text-surface-600 text-xs">
            Used when Symbols is checked. Leave empty to use the default symbol set.
          </span>
          <input
            id="custom-symbols-input"
            type="text"
            pInputText
            [ngModel]="store.customSymbols()"
            (ngModelChange)="store.setCustomSymbols($event)"
            class="font-mono text-sm"
            placeholder="e.g. !&#64;#$%^&amp;*()"
            [attr.aria-labelledby]="'custom-symbols-label'"
            aria-describedby="custom-symbols-desc"
          />
          <span id="custom-symbols-desc" class="sr-only">
            Optional. Characters you want as symbols in generated passwords. Empty uses the default set.
          </span>
        </div>

        @if (store.errorMessage(); as err) {
          <p-message
            severity="error"
            [text]="err"
            variant="simple"
            class="text-sm"
            [attr.aria-live]="'polite'"
          />
        }

        <div class="flex flex-wrap gap-2">
          <p-button
            label="Generate passwords"
            icon="pi pi-refresh"
            iconPos="left"
            [disabled]="!store.canGenerate()"
            (onClick)="store.generate()"
            [attr.aria-label]="'Generate passwords'"
          />
          @if (store.passwords().length > 0) {
            <p-button
              label="Clear"
              icon="pi pi-trash"
              severity="secondary"
              (onClick)="store.clearPasswords()"
              [attr.aria-label]="'Clear generated passwords'"
            />
          }
        </div>
      </section>

      @if (store.passwords().length > 0) {
        <section
          class="flex flex-col gap-3"
          aria-labelledby="results-heading"
          aria-live="polite"
        >
          <h2 id="results-heading" class="text-surface-700 text-lg font-medium">
            Generated passwords
          </h2>
          <ul class="list-none flex flex-col gap-2 p-0 m-0">
            @for (pw of store.passwords(); track $index) {
              <li class="flex items-center gap-2">
                <input
                  type="text"
                  pInputText
                  [value]="pw"
                  readonly
                  class="flex-1 font-mono text-sm"
                  [attr.aria-label]="'Password ' + ($index + 1) + ' of ' + store.passwords().length"
                />
                <p-button
                  icon="pi pi-copy"
                  [rounded]="true"
                  severity="secondary"
                  (onClick)="copyToClipboard(pw)"
                  [attr.aria-label]="'Copy password ' + ($index + 1) + ' to clipboard'"
                />
              </li>
            }
          </ul>
        </section>
      }
    </div>
  `,
})
export class PasswordGeneratorFeature {
  protected readonly store = inject(PasswordGeneratorStore);
  private readonly messageService = inject(MessageService);

  protected copyToClipboard(text: string): void {
    void navigator.clipboard.writeText(text).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Copied!',
        life: 2000,
      });
    });
  }
}
