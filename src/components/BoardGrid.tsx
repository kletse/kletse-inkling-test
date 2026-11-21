import type { KeyboardEvent } from 'react';
import type { Board } from '../game/logic';

interface BoardGridProps {
  board: Board;
  winningLine: readonly number[] | null;
  disabled: boolean;
  onCellClick: (index: number) => void;
}

const ARROW_DELTAS: Record<string, number> = {
  ArrowUp: -3,
  ArrowDown: 3,
  ArrowLeft: -1,
  ArrowRight: 1,
};

export default function BoardGrid({ board, winningLine, disabled, onCellClick }: BoardGridProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const delta = ARROW_DELTAS[event.key];
    if (delta === undefined) return;

    const current = Number((event.target as HTMLElement).dataset.index);
    if (Number.isNaN(current)) return;

    const next = current + delta;
    // Keep horizontal moves inside the same row
    if (event.key === 'ArrowLeft' && current % 3 === 0) return;
    if (event.key === 'ArrowRight' && current % 3 === 2) return;
    if (next < 0 || next > 8) return;

    event.preventDefault();
    const grid = event.currentTarget;
    grid.querySelector<HTMLButtonElement>(`[data-index="${next}"]`)?.focus();
  };

  return (
    <div
      role="group"
      aria-label="Tic-tac-toe board"
      onKeyDown={handleKeyDown}
      className="grid w-full max-w-xs grid-cols-3 overflow-hidden rounded-md border-2 border-line bg-panel shadow-[0_0_32px_rgba(255,65,217,0.12)]"
    >
      {board.map((value, index) => {
        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        const isWinning = winningLine?.includes(index) ?? false;

        return (
          <button
            key={index}
            type="button"
            data-index={index}
            disabled={disabled || value !== null}
            onClick={() => onCellClick(index)}
            aria-label={`Row ${row}, column ${col}${value ? `, ${value}` : ', empty'}`}
            className={[
              'relative flex aspect-square w-full items-center justify-center',
              'border-line border-b-2 border-r-2',
              'transition-colors duration-150',
              'disabled:cursor-default',
              value === null && !disabled ? 'cursor-pointer hover:bg-white/5 active:bg-white/10' : '',
              index % 3 === 2 ? 'border-r-0' : '',
              index >= 6 ? 'border-b-0' : '',
              isWinning ? 'cell-win' : '',
            ].join(' ')}
          >
            {value && (
              <span
                aria-hidden="true"
                className={[
                  'cell-pop font-pixel text-3xl sm:text-4xl',
                  value === 'X' ? 'text-neon-cyan glow-cyan' : 'text-neon-magenta glow-magenta',
                ].join(' ')}
              >
                {value}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
