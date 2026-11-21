import { useState } from 'react';
import {
  EMPTY_BOARD,
  getPhase,
  getWinningLine,
  getWinner,
  otherPlayer,
  type Board,
  type Player,
} from './game/logic';
import BoardGrid from './components/BoardGrid';

interface Scores {
  X: number;
  O: number;
  draws: number;
}

export default function App() {
  const [board, setBoard] = useState<Board>([...EMPTY_BOARD]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 });

  const phase = getPhase(board);
  const winner = getWinner(board);
  const winningLine = getWinningLine(board);

  const handleCellClick = (index: number) => {
    if (phase !== 'playing' || board[index] !== null) return;

    const next = [...board];
    next[index] = currentPlayer;
    setBoard(next);

    const nextPhase = getPhase(next);
    if (nextPhase === 'won') {
      const winningPlayer = getWinner(next);
      if (winningPlayer) {
        setScores((s) => ({ ...s, [winningPlayer]: s[winningPlayer] + 1 }));
      }
    } else if (nextPhase === 'draw') {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    } else {
      setCurrentPlayer(otherPlayer(currentPlayer));
    }
  };

  const resetRound = () => {
    setBoard([...EMPTY_BOARD]);
    setCurrentPlayer('X');
  };

  const resetAll = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    resetRound();
  };

  const statusMessage =
    phase === 'won' && winner
      ? `Player ${winner} wins!`
      : phase === 'draw'
        ? 'It is a draw!'
        : `Player ${currentPlayer} to move`;

  return (
    <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-10">
      <header className="flex flex-col items-center gap-3 text-center">
        <p className="font-crt text-lg tracking-[0.35em] text-neon-amber/80 uppercase">
          Retro Arcade
        </p>
        <h1 className="font-pixel text-2xl leading-relaxed text-neon-cyan glow-cyan sm:text-3xl">
          TIC-TAC-TOE
        </h1>
      </header>

      <section
        aria-label="Scoreboard"
        className="grid w-full max-w-xs grid-cols-3 overflow-hidden rounded-md border-2 border-line bg-panel shadow-[0_0_24px_rgba(62,242,255,0.15)]"
      >
        <div className="flex flex-col items-center gap-1 border-r-2 border-line py-3">
          <span className="font-pixel text-[10px] text-neon-cyan">X</span>
          <span className="font-pixel text-xl text-neon-cyan glow-cyan" aria-label={`Player X score: ${scores.X}`}>
            {scores.X}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 border-r-2 border-line py-3">
          <span className="font-pixel text-[10px] text-slate-400">DRAW</span>
          <span className="font-pixel text-xl text-slate-300" aria-label={`Draws: ${scores.draws}`}>
            {scores.draws}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 py-3">
          <span className="font-pixel text-[10px] text-neon-magenta">O</span>
          <span className="font-pixel text-xl text-neon-magenta glow-magenta" aria-label={`Player O score: ${scores.O}`}>
            {scores.O}
          </span>
        </div>
      </section>

      <p role="status" aria-live="polite" className="min-h-8 text-center font-crt text-2xl text-neon-amber">
        {statusMessage}
      </p>

      <BoardGrid
        board={board}
        winningLine={winningLine}
        disabled={phase !== 'playing'}
        onCellClick={handleCellClick}
      />

      <div className="flex flex-col items-center gap-3">
        {phase !== 'playing' && (
          <p className="animate-blink font-pixel text-[10px] text-neon-amber">INSERT COIN</p>
        )}
        <button type="button" onClick={resetRound} className="btn-arcade">
          NEW ROUND
        </button>
        <button type="button" onClick={resetAll} className="font-crt text-lg text-slate-500 underline-offset-4 transition-colors hover:text-slate-300 hover:underline">
          reset scores
        </button>
      </div>

      <footer className="text-center font-crt text-base text-slate-600">
        2 PLAYERS · LOCAL · ARROW KEYS + ENTER
      </footer>
    </main>
  );
}
