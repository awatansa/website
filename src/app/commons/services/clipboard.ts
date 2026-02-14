import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  private readonly messageService = inject(MessageService);

  /**
   * Copies text to the clipboard and shows a success toast on success.
   * @param text Text to copy
   * @param successMessage Message to show in toast (default: 'Copied!')
   * @returns Promise that resolves when copy and toast are done, or rejects on clipboard failure
   */
  async copy(text: string, successMessage = 'Copied!'): Promise<void> {
    await navigator.clipboard.writeText(text);
    this.messageService.add({
      severity: 'success',
      summary: successMessage,
      life: 2000,
    });
  }
}
