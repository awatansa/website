import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Button } from 'primeng/button';
import { ClipboardService } from '@/commons/services';

@Component({
  selector: 'vy-copy-button',
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-button
      icon="pi pi-copy"
      [rounded]="true"
      severity="secondary"
      (onClick)="onCopy()"
      [attr.aria-label]="ariaLabel() ?? 'Copy to clipboard'"
    />
  `,
})
export class CopyButtonComponent {
  private readonly clipboard = inject(ClipboardService);

  /** Text to copy when the button is clicked. */
  readonly text = input.required<string>();
  /** Accessible label for the button. */
  readonly ariaLabel = input<string | undefined>(undefined);

  protected onCopy(): void {
    void this.clipboard.copy(this.text());
  }
}
