import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { SelectButton } from 'primeng/selectbutton';
import { Message } from 'primeng/message';
import { PageLayoutComponent } from '@/commons/components';
import { Base32Store } from '@/features/tools/developer-tool/base32-encode-decode/store';
import type { TransformMode } from '@/features/tools/developer-tool/base32-encode-decode/store';

const TRANSFORM_OPTIONS: { label: string; value: TransformMode }[] = [
  { label: 'Transform on input', value: 'live' },
  { label: 'Transform on button click', value: 'onClick' },
];

@Component({
  selector: 'vy-base32-encode-decode',
  imports: [FormsModule, Button, Textarea, SelectButton, Message, PageLayoutComponent],
  providers: [Base32Store],
  host: {
    'aria-label': 'Base32 encode and decode tool',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vy-page-layout
      heading="Base32 Encode / Decode"
      headingId="base32-heading"
      description="Encode text to Base32 (RFC 4648) or decode Base32 to text. Choose to transform as you type or on button click."
      maxWidth="4xl"
    >
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
          aria-labelledby="base32-label"
        >
          <label id="base32-label" class="text-surface-700 dark:text-surface-200 text-sm font-medium" for="base32-textarea">
            Base32
          </label>
          <textarea
            id="base32-textarea"
            pTextarea
            [ngModel]="store.base32Text()"
            (ngModelChange)="store.setBase32Text($event)"
            rows="8"
            fluid
            class="w-full resize-y"
            placeholder="Enter Base32 to decode…"
            [invalid]="!!store.decodeError()"
            aria-describedby="base32-error"
            aria-invalid="!!store.decodeError()"
          ></textarea>
          @if (store.decodeError(); as err) {
            <p-message
              id="base32-error"
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
            [attr.aria-label]="'Encode plain text to Base32'"
          />
          <p-button
            label="← Decode"
            icon="pi pi-arrow-left"
            iconPos="left"
            (onClick)="store.decode()"
            [attr.aria-label]="'Decode Base32 to plain text'"
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
    </vy-page-layout>
  `,
})
export class Base32EncodeDecodeFeature {
  protected readonly store = inject(Base32Store);
  protected readonly transformOptions = TRANSFORM_OPTIONS;
}
