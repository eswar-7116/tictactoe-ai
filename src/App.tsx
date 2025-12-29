import { useEffect, useState } from "react";
import Box from "./components/Box";
import bestMove, { isTermination } from "./util/bot";

export default function App() {
  const [board, setBoard] = useState(new Array<string>(9).fill(""));
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if game ends
    const [terminated, winner] = isTermination(board);
    if (!terminated) return;

    setGameOver(true);
    if (winner === "") setMessage("It's a tie!");
    else if (winner === "X") setMessage("Congratulations! You won!!");
    else setMessage("Uh oh! You lost!");
  }, [board]);

  const play = (idx: number) => {
    // Check if game is over
    if (gameOver) return;

    setBoard((prev) => {
      const next = [...prev];

      // Human's move
      next[idx] = !prev[idx] || prev[idx] === "O" ? "X" : "O";

      // Bot's move
      const botIdx = bestMove(next);
      if (botIdx !== -1) next[botIdx] = "O";

      return next;
    });
  };

  const reset = () => {
    setBoard(new Array<string>(9).fill(""));
    setGameOver(false);
    setMessage("");
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <header className="mb-10 text-6xl">Tic-Tac-Toe</header>
      <p className="text-2xl font-medium">{message}</p>
      <main className="mt-3 scale-80">
        {[0, 3, 6].map((start) => (
          <div
            className="flex flex-row items-center justify-center"
            key={start}
          >
            {[0, 1, 2].map((i) => {
              const idx = start + i;
              return (
                <Box value={board[idx]} key={idx} onClick={() => play(idx)} />
              );
            })}
          </div>
        ))}
      </main>
      <div className="rounded-full bg-red-800 mt-6 flex items-center justify-center p-4 will-change-transform transition-transform hover:scale-110 cursor-pointer" onClick={() => reset()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="scale-150"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </div>
    </div>
  );
}
