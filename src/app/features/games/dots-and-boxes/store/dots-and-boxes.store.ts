import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import {
  createInitialState,
  horizontalEdgeIndex,
  verticalEdgeIndex,
  boxEdgeIndices,
  boxesTouchingHorizontalEdge,
  boxesTouchingVerticalEdge,
  type DotsAndBoxesState,
  type PlayerId,
} from './dots-and-boxes-game.utils';
import {
  getCellType as getCellTypeUtil,
  gridRowsCss,
  gridColsCss,
  rowIndices as rowIndicesUtil,
  colIndices as colIndicesUtil,
  horizontalEdgeRowCol,
  verticalEdgeRowCol,
  boxRowCol,
} from './dots-and-boxes-grid.utils';

export type { PlayerId, DotsAndBoxesState };

const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 3;
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
      gridRows: () => gridRowsCss(store.rows()),
      gridCols: () => gridColsCss(store.cols()),
      rowIndices: () => rowIndicesUtil(store.rows()),
      colIndices: () => colIndicesUtil(store.cols()),
      gridAriaLabel: () =>
        `Game board, ${store.rows()} by ${store.cols()} boxes`,
    };
  }),
  withMethods((store) => {
    const r = () => store.rows();
    const c = () => store.cols();
    return {
      getCellType(i: number, j: number) {
        return getCellTypeUtil(i, j);
      },
      getHorizontalOwner(i: number, j: number): PlayerId | null {
        const { row, col } = horizontalEdgeRowCol(i, j);
        const idx = horizontalEdgeIndex(r(), c(), row, col);
        return store.horizontalEdges()[idx];
      },
      getVerticalOwner(i: number, j: number): PlayerId | null {
        const { row, col } = verticalEdgeRowCol(i, j);
        const idx = verticalEdgeIndex(r(), c(), row, col);
        return store.verticalEdges()[idx];
      },
      getBoxOwner(i: number, j: number): PlayerId | null {
        const { row, col } = boxRowCol(i, j);
        return store.boxes()[row * c() + col];
      },
      getHorizontalEdgeAriaLabel(i: number, j: number): string {
        const owner = this.getHorizontalOwner(i, j);
        if (owner !== null) return `Line claimed by Player ${owner}`;
        if (store.gameOver()) return 'Game over';
        return `Draw line – Player ${store.currentPlayer()}'s turn`;
      },
      getVerticalEdgeAriaLabel(i: number, j: number): string {
        const owner = this.getVerticalOwner(i, j);
        if (owner !== null) return `Line claimed by Player ${owner}`;
        if (store.gameOver()) return 'Game over';
        return `Draw line – Player ${store.currentPlayer()}'s turn`;
      },
      claimHorizontalEdgeAt(i: number, j: number) {
        const { row, col } = horizontalEdgeRowCol(i, j);
        this.claimHorizontalEdge(row, col);
      },
      claimVerticalEdgeAt(i: number, j: number) {
        const { row, col } = verticalEdgeRowCol(i, j);
        this.claimVerticalEdge(row, col);
      },
      claimHorizontalEdge(row: number, col: number) {
        const rows = r();
        const cols = c();
        const idx = horizontalEdgeIndex(rows, cols, row, col);
        const horizontal = store.horizontalEdges();
        if (horizontal[idx] !== null) return;
        const newH = [...horizontal];
        newH[idx] = store.currentPlayer();
        const newBoxes = [...store.boxes()];
        let claimedAny = false;
        for (const [br, bc] of boxesTouchingHorizontalEdge(rows, cols, row, col)) {
          const [hTop, hBottom, vLeft, vRight] = boxEdgeIndices(rows, cols, br, bc);
          const vert = store.verticalEdges();
          if (
            newH[hTop] !== null &&
            newH[hBottom] !== null &&
            vert[vLeft] !== null &&
            vert[vRight] !== null
          ) {
            newBoxes[br * cols + bc] = store.currentPlayer();
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
        const rows = r();
        const cols = c();
        const idx = verticalEdgeIndex(rows, cols, row, col);
        const vertical = store.verticalEdges();
        if (vertical[idx] !== null) return;
        const newV = [...vertical];
        newV[idx] = store.currentPlayer();
        const newBoxes = [...store.boxes()];
        let claimedAny = false;
        for (const [br, bc] of boxesTouchingVerticalEdge(rows, cols, row, col)) {
          const [hTop, hBottom, vLeft, vRight] = boxEdgeIndices(rows, cols, br, bc);
          const hor = store.horizontalEdges();
          if (
            hor[hTop] !== null &&
            hor[hBottom] !== null &&
            newV[vLeft] !== null &&
            newV[vRight] !== null
          ) {
            newBoxes[br * cols + bc] = store.currentPlayer();
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
      setGridSize(rows: number, cols: number) {
        patchState(store, createInitialState(rows, cols));
      },
    };
  })
);
