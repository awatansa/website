import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export type CellValue = '' | 'X' | 'O';

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

function checkWinner(board: readonly CellValue[]): CellValue {
  for (const [a, b, c] of WIN_LINES) {
    const v = board[a];
    if (v !== '' && v === board[b] && v === board[c]) {
      return v;
    }
  }
  return '';
}

function isBoardFull(board: readonly CellValue[]): boolean {
  return board.every((cell) => cell !== '');
}

const INITIAL_BOARD: CellValue[] = Array(9).fill('');

export interface TicTacToeState {
  board: CellValue[];
  currentPlayer: 'X' | 'O';
}

const initialState: TicTacToeState = {
  board: [...INITIAL_BOARD],
  currentPlayer: 'X',
};

export const TicTacToeStore = signalStore(
  withState<TicTacToeState>(initialState),
  withComputed((store) => ({
    winner: () => checkWinner(store.board()),
    isDraw: () => isBoardFull(store.board()) && checkWinner(store.board()) === '',
    gameOver: () => {
      const w = checkWinner(store.board());
      const draw = isBoardFull(store.board()) && w === '';
      return w !== '' || draw;
    },
    statusMessage: () => {
      const w = checkWinner(store.board());
      if (w !== '') return `Player ${w} wins!`;
      if (isBoardFull(store.board()) && w === '') return "It's a draw!";
      return `Player ${store.currentPlayer()}'s turn`;
    },
  })),
  withMethods((store) => ({
    makeMove(index: number) {
      const b = store.board();
      if (b[index] !== '') return;
      const w = checkWinner(b);
      const draw = isBoardFull(b) && w === '';
      if (w !== '' || draw) return;
      const newBoard = [...b] as CellValue[];
      newBoard[index] = store.currentPlayer();
      patchState(store, {
        board: newBoard,
        currentPlayer: store.currentPlayer() === 'X' ? 'O' : 'X',
      });
    },
    reset() {
      patchState(store, {
        board: [...INITIAL_BOARD],
        currentPlayer: 'X',
      });
    },
  }))
);
