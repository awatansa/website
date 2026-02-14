import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TicTacToeStore } from '@/features/games/tic-tac-toe/store';
import { TicTacToeBoardComponent } from '@/features/games/tic-tac-toe/components/tic-tac-toe-board';

@Component({
  selector: 'vy-tic-tac-toe-feature',
  imports: [TicTacToeBoardComponent],
  providers: [TicTacToeStore],
  template: `<vy-tic-tac-toe />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicTacToeFeature {}
