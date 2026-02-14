/**
 * Pure grid/cell math for the Dots and Boxes board.
 * Grid (i, j) is 0-based; i = row, j = col.
 */

export type CellType = 'dot' | 'horizontalEdge' | 'verticalEdge' | 'box';

export function isDot(i: number, j: number): boolean {
  return i % 2 === 0 && j % 2 === 0;
}

export function isHorizontalEdge(i: number, j: number): boolean {
  return i % 2 === 0 && j % 2 === 1;
}

export function isVerticalEdge(i: number, j: number): boolean {
  return i % 2 === 1 && j % 2 === 0;
}

export function isBox(i: number, j: number): boolean {
  return i % 2 === 1 && j % 2 === 1;
}

export function getCellType(i: number, j: number): CellType {
  if (isDot(i, j)) return 'dot';
  if (isHorizontalEdge(i, j)) return 'horizontalEdge';
  if (isVerticalEdge(i, j)) return 'verticalEdge';
  return 'box';
}

/** Horizontal edge at grid (i, j) has game position (row, col). */
export function horizontalEdgeRowCol(i: number, j: number): { row: number; col: number } {
  return { row: i / 2, col: (j - 1) / 2 };
}

/** Vertical edge at grid (i, j) has game position (row, col). */
export function verticalEdgeRowCol(i: number, j: number): { row: number; col: number } {
  return { row: (i - 1) / 2, col: j / 2 };
}

/** Box at grid (i, j) has game position (row, col). */
export function boxRowCol(i: number, j: number): { row: number; col: number } {
  return { row: (i - 1) / 2, col: (j - 1) / 2 };
}

export function gridRowCount(rows: number): number {
  return 2 * rows + 1;
}

export function gridColCount(cols: number): number {
  return 2 * cols + 1;
}

export function gridRowsCss(rows: number): string {
  return `repeat(${gridRowCount(rows)}, auto)`;
}

export function gridColsCss(cols: number): string {
  return `repeat(${gridColCount(cols)}, auto)`;
}

export function rowIndices(rows: number): number[] {
  return Array.from({ length: gridRowCount(rows) }, (_, i) => i);
}

export function colIndices(cols: number): number[] {
  return Array.from({ length: gridColCount(cols) }, (_, i) => i);
}
