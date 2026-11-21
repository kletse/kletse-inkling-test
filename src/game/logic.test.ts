import { describe, expect, it } from 'vitest';
import {
  EMPTY_BOARD,
  getPhase,
  getWinningLine,
  getWinner,
  isDraw,
  isBoardFull,
  otherPlayer,
  type Board,
} from './logic';

function board(cells: Array<'X' | 'O' | null>): Board {
  return [...cells];
}

describe('getWinningLine', () => {
  it('detects a horizontal win', () => {
    const line = getWinningLine(board(['X', 'X', 'X', null, null, null, null, null, null]));
    expect(line).toEqual([0, 1, 2]);
  });

  it('detects a vertical win', () => {
    const line = getWinningLine(board(['O', null, null, 'O', null, null, 'O', null, null]));
    expect(line).toEqual([0, 3, 6]);
  });

  it('detects a diagonal win', () => {
    const line = getWinningLine(board(['X', null, null, null, 'X', null, null, null, 'X']));
    expect(line).toEqual([0, 4, 8]);
  });

  it('detects the anti-diagonal win', () => {
    const line = getWinningLine(board([null, null, 'O', null, 'O', null, 'O', null, null]));
    expect(line).toEqual([2, 4, 6]);
  });

  it('returns null when there is no winner', () => {
    const line = getWinningLine(board(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', null]));
    expect(line).toBeNull();
  });

  it('returns null for an empty board', () => {
    expect(getWinningLine([...EMPTY_BOARD])).toBeNull();
  });
});

describe('getWinner / isDraw / getPhase', () => {
  it('returns the winning player', () => {
    expect(getWinner(board(['O', 'O', 'O', 'X', 'X', null, null, null, null]))).toBe('O');
  });

  it('detects a draw', () => {
    const full = board(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']);
    expect(isDraw(full)).toBe(true);
    expect(getPhase(full)).toBe('draw');
  });

  it('reports playing while the board has an empty cell', () => {
    expect(getPhase(board(['X', 'O', null, null, null, null, null, null, null]))).toBe('playing');
  });

  it('reports won when there is a winner', () => {
    expect(getPhase(board(['X', 'X', 'X', null, null, null, null, null, null]))).toBe('won');
  });
});

describe('isBoardFull', () => {
  it('is false for a partially filled board', () => {
    expect(isBoardFull(board(['X', 'O', null, null, null, null, null, null, null]))).toBe(false);
  });

  it('is true for a full board', () => {
    expect(isBoardFull(board(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']))).toBe(true);
  });
});

describe('otherPlayer', () => {
  it('flips between X and O', () => {
    expect(otherPlayer('X')).toBe('O');
    expect(otherPlayer('O')).toBe('X');
  });
});
