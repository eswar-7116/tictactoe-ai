export function isTermination(state: string[]) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // Check if any player won
    for (const [a, b, c] of winPatterns) {
        if (state[a] !== "" && state[a] === state[b] && state[b] === state[c]) {
            return [true, state[a]];
        }
    }

    // Check if it is a tie
    const isTie = state.every(v => v !== "");

    return [isTie, ""];
}

function minimax(state: string[], isMaximizing: boolean, alpha = -Infinity, beta = Infinity) {
    // Base condition: check if game is over and return score
    const [terminated, winner] = isTermination(state);
    if (terminated) {
        if (winner === "X") return 1;
        if (winner === "O") return -1;
        return 0;
    }

    // Play as 'X'
    if (isMaximizing) {
        let best = -Infinity;
        for (let i=0; i<9; i++) {
            if (state[i] === "") {
                state[i] = "X";
                best = Math.max(best, minimax(state, false, alpha, beta));
                state[i] = "";

                alpha = Math.max(alpha, best);
                if (alpha >= beta) break;  // Prune
            }
        }
        return best;
    }

    // Play as 'O'
    let best = Infinity;
    for (let i=0; i<9; i++) {
        if (state[i] === "") {
            state[i] = "O";
            best = Math.min(best, minimax(state, true, alpha, beta));
            state[i] = "";

            beta = Math.max(beta, best);
            if (alpha >= beta) break;  // Prune
        }
    }
    return best;
}

export default function bestMove(state: string[]) {
    // Play as 'O'
    let bestScore = Infinity;
    let ret = -1;
    for (let i=0; i<9; i++) {
        if (state[i] === "") {
            state[i] = "O";
            
            let score = minimax(state, true);
            if (bestScore > score) {
                bestScore = score;
                ret = i;
            }

            state[i] = "";
        }
    }
    return ret;
}
