import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { SelectButton } from 'primeng/selectbutton';
import { Message } from 'primeng/message';
import { Base64Store } from '@/features/tools/base64-encode-decode/store';
import type { TransformMode } from '@/features/tools/base64-encode-decode/store';

const TRANSFORM_OPTIONS: { label: string; value: TransformMode }[] = [
  { label: 'Transform on input', value: 'live' },
  { label: 'Transform on button click', value: 'onClick' },
];

@Component({
  selector: 'vy-base64-encode-decode',
  imports: [RouterLink, FormsModule, Button, Textarea, SelectButton, Message],
  providers: [Base64Store],
  host: {
    'aria-label': 'Base64 encode and decode tool',
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

      <h1 class="text-surface-700 dark:text-surface-200 mb-2 text-2xl font-semibold" id="base64-heading">
        Base64 Encode / Decode
      </h1>
      <p class="text-surface-600 dark:text-surface-400 mb-6 text-sm">
        Encode text to Base64 or decode Base64 to text. Choose to transform as you type or on button click.
      </p>

      <div class="mb-4 flex flex-wrap items-center gap-3">
        <span class="text-surface-700 dark:text-surface-200 text-sm font-medium">Transform:</span>
        <p-selectButton
          [options]="transformOptions"
          [ngModel]="store.transformMode()"
          (ngModelChange)="store.setTransformMode($event)"
          optionLabel="label"
          optionValue="value"
          aria-label="Choose when to transform: on input or on button click"
        />
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <section
          class="flex flex-col gap-2"
          aria-labelledby="plain-label"
        >
          <label id="plain-label" class="text-surface-700 dark:text-surface-200 text-sm font-medium" for="plain-textarea">
            Plain text
          </label>
          <textarea
            id="plain-textarea"
            pTextarea
            [ngModel]="store.plainText()"
            (ngModelChange)="store.setPlainText($event)"
            rows="8"
            fluid
            class="w-full resize-y"
            placeholder="Enter text to encode…"
            [invalid]="!!store.encodeError()"
            aria-describedby="plain-error"
            aria-invalid="!!store.encodeError()"
          ></textarea>
          @if (store.encodeError(); as err) {
            <p-message
              id="plain-error"
              severity="error"
              [text]="err"
              variant="simple"
              class="text-sm"
            />
          }
        </section>

        <section
          class="flex flex-col gap-2"
          aria-labelledby="base64-label"
        >
          <label id="base64-label" class="text-surface-700 dark:text-surface-200 text-sm font-medium" for="base64-textarea">
            Base64
          </label>
          <textarea
            id="base64-textarea"
            pTextarea
            [ngModel]="store.base64Text()"
            (ngModelChange)="store.setBase64Text($event)"
            rows="8"
            fluid
            class="w-full resize-y"
            placeholder="Enter Base64 to decode…"
            [invalid]="!!store.decodeError()"
            aria-describedby="base64-error"
            aria-invalid="!!store.decodeError()"
          ></textarea>
          @if (store.decodeError(); as err) {
            <p-message
              id="base64-error"
              severity="error"
              [text]="err"
              variant="simple"
              class="text-sm"
            />
          }
        </section>
      </div>

      @if (store.transformMode() === 'onClick') {
        <div class="mt-4 flex flex-wrap gap-2">
          <p-button
            label="Encode →"
            icon="pi pi-arrow-right"
            iconPos="right"
            (onClick)="store.encode()"
            [attr.aria-label]="'Encode plain text to Base64'"
          />
          <p-button
            label="← Decode"
            icon="pi pi-arrow-left"
            iconPos="left"
            (onClick)="store.decode()"
            [attr.aria-label]="'Decode Base64 to plain text'"
          />
        </div>
      }

      <div class="mt-4">
        <p-button
          label="Clear"
          icon="pi pi-trash"
          severity="secondary"
          (onClick)="store.clear()"
          [attr.aria-label]="'Clear both fields'"
        />
      </div>
    </div>
  `,
})
export class Base64EncodeDecodeFeature {
  protected readonly store = inject(Base64Store);
  protected readonly transformOptions = TRANSFORM_OPTIONS;
}
