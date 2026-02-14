/**
 * Game logic and index math for Dots and Boxes.
 * Edge/box indices are derived from grid dimensions and positions.
 */

export type PlayerId = 1 | 2;

export function countHorizontal(rows: number, cols: number): number {
  return (rows + 1) * cols;
}

export function countVertical(rows: number, cols: number): number {
  return rows * (cols + 1);
}

export function horizontalEdgeIndex(rows: number, cols: number, row: number, col: number): number {
  return row * cols + col;
}

export function verticalEdgeIndex(rows: number, cols: number, row: number, col: number): number {
  return row * (cols + 1) + col;
}

/** Box (r, c) has top-left dot (r, c). Returns [hTop, hBottom, vLeft, vRight] indices. */
export function boxEdgeIndices(
  rows: number,
  cols: number,
  boxRow: number,
  boxCol: number
): [number, number, number, number] {
  const hTop = horizontalEdgeIndex(rows, cols, boxRow, boxCol);
  const hBottom = horizontalEdgeIndex(rows, cols, boxRow + 1, boxCol);
  const vLeft = verticalEdgeIndex(rows, cols, boxRow, boxCol);
  const vRight = verticalEdgeIndex(rows, cols, boxRow, boxCol + 1);
  return [hTop, hBottom, vLeft, vRight];
}

export function boxesTouchingHorizontalEdge(
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

export function boxesTouchingVerticalEdge(
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

export function createInitialState(rows: number, cols: number): DotsAndBoxesState {
  return {
    rows,
    cols,
    horizontalEdges: Array(countHorizontal(rows, cols)).fill(null),
    verticalEdges: Array(countVertical(rows, cols)).fill(null),
    boxes: Array(rows * cols).fill(null),
    currentPlayer: 1,
  };
}
