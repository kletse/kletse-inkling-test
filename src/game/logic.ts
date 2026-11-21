export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[]; // length 9, row-major

export const BOARD_SIZE = 9;
export const WIN_LINES: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const EMPTY_BOARD: Board = Array(BOARD_SIZE).fill(null);

export function otherPlayer(player: Player): Player {
  return player === 'X' ? 'O' : 'X';
}

export function getWinningLine(board: Board): readonly [number, number, number] | null {
  for (const [a, b, c] of WIN_LINES) {
    const value = board[a];
    if (value !== null && value === board[b] && value === board[c]) {
      return [a, b, c];
    }
  }
  return null;
}

export function getWinner(board: Board): Player | null {
  const line = getWinningLine(board);
  return line ? board[line[0]] : null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

export function isDraw(board: Board): boolean {
  return getWinner(board) === null && isBoardFull(board);
}

export type GamePhase = 'playing' | 'won' | 'draw';

export function getPhase(board: Board): GamePhase {
  if (getWinner(board) !== null) return 'won';
  if (isBoardFull(board)) return 'draw';
  return 'playing';
}
