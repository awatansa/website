import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TicTacToeStore } from '@/features/games/components/tic-tac-toe/store';
import { TicTacToeUiComponent } from '@/features/games/components/tic-tac-toe/tic-tac-toe.ui';

@Component({
  selector: 'vy-tic-tac-toe-feature',
  imports: [TicTacToeUiComponent],
  providers: [TicTacToeStore],
  template: `<vy-tic-tac-toe />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicTacToeFeature {}
