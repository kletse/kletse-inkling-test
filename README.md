# TIC-TAC-TOE // Retro Arcade

A retro arcade-style tic-tac-toe game built with React, TypeScript and Tailwind CSS. Two local players, one grid, endless bragging rights.

![Stack](https://img.shields.io/badge/React-19-61dafb) ![Stack](https://img.shields.io/badge/TypeScript-5.9-3178c6) ![Stack](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- Two-player local play (X vs O) with persistent score tracking (X / draws / O)
- Retro CRT aesthetic: scanlines, vignette, neon glow, pixel font (Press Start 2P + VT323)
- Winning-line highlight and a blinking "INSERT COIN" prompt when a round ends
- Keyboard friendly: full arrow-key navigation across the grid, semantic buttons with accessible labels
- `prefers-reduced-motion` support — all animations are opt-in
- Status announcements via a polite live region

## Getting started

```sh
npm install
npm run dev
```

Then open the printed local URL (default http://localhost:5173).

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check (`tsc -b`) and build      |
| `npm run preview` | Serve the production build locally   |
| `npm test`        | Run the game-logic unit tests        |

## Project structure

```
src/
  game/
    logic.ts         # pure game logic: win lines, winner/draw/phase detection
    logic.test.ts    # vitest unit tests for the logic
  components/
    BoardGrid.tsx    # 3x3 grid, keyboard navigation, winning highlight
  App.tsx            # game state, scoreboard, layout
  main.tsx           # entry point
  index.css          # Tailwind theme + retro CRT styles
```

## Game rules

Players take turns marking empty cells with X or O. The first player to align three of their marks horizontally, vertically or diagonally wins the round. If the board fills with no winner, the round is a draw. Scores persist across rounds until reset.
