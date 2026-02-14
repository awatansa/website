import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { SelectButton } from 'primeng/selectbutton';
import { Message } from 'primeng/message';
import { PageLayoutComponent } from '@/commons/components';
import { UrlEncodeDecodeStore } from '@/features/tools/developer-tool/url-encode-decode/store';
import type { TransformMode } from '@/features/tools/developer-tool/url-encode-decode/store';

const TRANSFORM_OPTIONS: { label: string; value: TransformMode }[] = [
  { label: 'Transform on input', value: 'live' },
  { label: 'Transform on button click', value: 'onClick' },
];

@Component({
  selector: 'vy-url-encode-decode',
  imports: [FormsModule, Button, Textarea, SelectButton, Message, PageLayoutComponent],
  providers: [UrlEncodeDecodeStore],
  host: {
    'aria-label': 'URL encode and decode tool',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vy-page-layout
      heading="URL Encode / Decode"
      headingId="url-heading"
      description="Encode text for use in URL query strings or decode URL-encoded strings. Transform as you type or on button click."
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
            [attr.aria-invalid]="!!store.encodeError()"
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
          aria-labelledby="encoded-label"
        >
          <label id="encoded-label" class="text-surface-700 dark:text-surface-200 text-sm font-medium" for="encoded-textarea">
            URL-encoded
          </label>
          <textarea
            id="encoded-textarea"
            pTextarea
            [ngModel]="store.encodedText()"
            (ngModelChange)="store.setEncodedText($event)"
            rows="8"
            fluid
            class="w-full resize-y"
            placeholder="Enter URL-encoded string to decode…"
            [invalid]="!!store.decodeError()"
            aria-describedby="encoded-error"
            [attr.aria-invalid]="!!store.decodeError()"
          ></textarea>
          @if (store.decodeError(); as err) {
            <p-message
              id="encoded-error"
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
            aria-label="Encode plain text to URL string"
          />
          <p-button
            label="← Decode"
            icon="pi pi-arrow-left"
            iconPos="left"
            (onClick)="store.decode()"
            aria-label="Decode URL string to plain text"
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
export class UrlEncodeDecodeFeature {
  protected readonly store = inject(UrlEncodeDecodeStore);
  protected readonly transformOptions = TRANSFORM_OPTIONS;
}
