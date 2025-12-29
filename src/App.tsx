import { useState } from "react";
import Box from "./components/Box";

export default function App() {
  const [board, setBoard] = useState(new Array<string>(9).fill(""));

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <header className="m-10 text-6xl">Tic-Tac-Toe</header>
      <main className="m-3">
        {[0, 3, 6].map((start) => (
          <div
            className="flex flex-row items-center justify-center"
            key={start}
          >
            {[0, 1, 2].map((i) => {
              const idx = start + i;
              return (
                <Box
                  value={board[idx]}
                  key={idx}
                  onClick={() => {
                    setBoard((prev) => {
                      const next = [...prev];
                      next[idx] = (!prev[idx] || prev[idx] === 'O') ? "X" : "O";
                      return next;
                    });
                  }}
                />
              );
            })}
          </div>
        ))}
      </main>
    </div>
  );
}
