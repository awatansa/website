import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export type PlayerId = 1 | 2;

const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 3;

function countHorizontal(rows: number, cols: number): number {
  return (rows + 1) * cols;
}

function countVertical(rows: number, cols: number): number {
  return rows * (cols + 1);
}

function hIndex(rows: number, cols: number, row: number, col: number): number {
  return row * cols + col;
}

function vIndex(rows: number, cols: number, row: number, col: number): number {
  return row * (cols + 1) + col;
}

/** Box (r, c) has top-left dot (r, c). Returns [hTop, hBottom, vLeft, vRight] indices. */
function boxEdgeIndices(
  rows: number,
  cols: number,
  boxRow: number,
  boxCol: number
): [number, number, number, number] {
  const hTop = hIndex(rows, cols, boxRow, boxCol);
  const hBottom = hIndex(rows, cols, boxRow + 1, boxCol);
  const vLeft = vIndex(rows, cols, boxRow, boxCol);
  const vRight = vIndex(rows, cols, boxRow, boxCol + 1);
  return [hTop, hBottom, vLeft, vRight];
}

function boxesTouchingHorizontalEdge(
  rows: number,
  cols: number,
  row: number,
  col: number
): Array<[number, number]> {
  const result: Array<[number, number]> = [];
  if (row > 0) result.push([row - 1, col]);
  if (row < rows) result.push([row, col]);
  return result;
}

function boxesTouchingVerticalEdge(
  rows: number,
  cols: number,
  row: number,
  col: number
): Array<[number, number]> {
  const result: Array<[number, number]> = [];
  if (col > 0) result.push([row, col - 1]);
  if (col < cols) result.push([row, col]);
  return result;
}

export interface DotsAndBoxesState {
  rows: number;
  cols: number;
  horizontalEdges: (PlayerId | null)[];
  verticalEdges: (PlayerId | null)[];
  boxes: (PlayerId | null)[];
  currentPlayer: PlayerId;
}

function createInitialState(rows: number, cols: number): DotsAndBoxesState {
  const numH = countHorizontal(rows, cols);
  const numV = countVertical(rows, cols);
  const numBoxes = rows * cols;
  return {
    rows,
    cols,
    horizontalEdges: Array(numH).fill(null),
    verticalEdges: Array(numV).fill(null),
    boxes: Array(numBoxes).fill(null),
    currentPlayer: 1,
  };
}

const initialState = createInitialState(DEFAULT_ROWS, DEFAULT_COLS);

export const DotsAndBoxesStore = signalStore(
  withState<DotsAndBoxesState>(initialState),
  withComputed((store) => {
    const score1 = () => store.boxes().filter((b) => b === 1).length;
    const score2 = () => store.boxes().filter((b) => b === 2).length;
    const gameOver = () => store.boxes().every((b) => b !== null);
    return {
      score1,
      score2,
      totalBoxes: () => store.rows() * store.cols(),
      gameOver,
      statusMessage: () => {
        if (gameOver()) {
          const s1 = score1();
          const s2 = score2();
          if (s1 > s2) return `Player 1 wins ${s1}–${s2}!`;
          if (s2 > s1) return `Player 2 wins ${s2}–${s1}!`;
          return "It's a draw!";
        }
        return `Player ${store.currentPlayer()}'s turn – draw a line`;
      },
    };
  }),
  withMethods((store) => {
    const rows = () => store.rows();
    const cols = () => store.cols();
    return {
      claimHorizontalEdge(row: number, col: number) {
        const r = rows();
        const c = cols();
        const idx = hIndex(r, c, row, col);
        const horizontal = store.horizontalEdges();
        if (horizontal[idx] !== null) return;
        const newH = [...horizontal];
        newH[idx] = store.currentPlayer();
        const newBoxes = [...store.boxes()];
        let claimedAny = false;
        for (const [br, bc] of boxesTouchingHorizontalEdge(r, c, row, col)) {
          const [hTop, hBottom, vLeft, vRight] = boxEdgeIndices(r, c, br, bc);
          const vert = store.verticalEdges();
          if (
            newH[hTop] !== null &&
            newH[hBottom] !== null &&
            vert[vLeft] !== null &&
            vert[vRight] !== null
          ) {
            newBoxes[br * c + bc] = store.currentPlayer();
            claimedAny = true;
          }
        }
        patchState(store, {
          horizontalEdges: newH,
          boxes: newBoxes,
          currentPlayer: claimedAny ? store.currentPlayer() : (store.currentPlayer() === 1 ? 2 : 1),
        });
      },
      claimVerticalEdge(row: number, col: number) {
        const r = rows();
        const c = cols();
        const idx = vIndex(r, c, row, col);
        const vertical = store.verticalEdges();
        if (vertical[idx] !== null) return;
        const newV = [...vertical];
        newV[idx] = store.currentPlayer();
        const newBoxes = [...store.boxes()];
        let claimedAny = false;
        for (const [br, bc] of boxesTouchingVerticalEdge(r, c, row, col)) {
          const [hTop, hBottom, vLeft, vRight] = boxEdgeIndices(r, c, br, bc);
          const hor = store.horizontalEdges();
          if (
            hor[hTop] !== null &&
            hor[hBottom] !== null &&
            newV[vLeft] !== null &&
            newV[vRight] !== null
          ) {
            newBoxes[br * c + bc] = store.currentPlayer();
            claimedAny = true;
          }
        }
        patchState(store, {
          verticalEdges: newV,
          boxes: newBoxes,
          currentPlayer: claimedAny ? store.currentPlayer() : (store.currentPlayer() === 1 ? 2 : 1),
        });
      },
      reset() {
        patchState(store, createInitialState(store.rows(), store.cols()));
      },
    };
  })
);
