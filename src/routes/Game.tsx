import { useState, useEffect } from "react";

interface Score {
  x: number;
  o: number;
  draws: number;
}

interface Move {
  squares: Array<string | null>;
  player: string;
}

const Game = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [score, setScore] = useState<Score>({ x: 0, o: 0, draws: 0 });
  const [history, setHistory] = useState<Array<Move>>([]);
  const [stepNumber, setStepNumber] = useState<number>(0);

  useEffect(() => {
    const storedScore = localStorage.getItem("tic-tac-toe-score");
    if (storedScore) {
      setScore(JSON.parse(storedScore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tic-tac-toe-score", JSON.stringify(score));
  }, [score]);

  const handleClick = (index: number) => {
    const squaresCopy = [...board];
    if (calculateWinner(squaresCopy) || squaresCopy[index]) {
      return;
    }
    squaresCopy[index] = xIsNext ? "X" : "O";
    setBoard(squaresCopy);
    setXIsNext(!xIsNext);
    const updatedHistory = history.slice(0, stepNumber + 1);
    setHistory([...updatedHistory, { squares: squaresCopy, player: xIsNext ? "X" : "O" }]);
    setStepNumber(updatedHistory.length);

    const winner = calculateWinner(squaresCopy);
    if (winner) {
      handleWinner(winner);
    } else if (squaresCopy.every((square) => square !== null)) {
      handleDraw();
    }
  };

  const handleWinner = (winner: string) => {
    const winnerMessage = `Player ${winner} wins!`;
    alert(winnerMessage);
    if (winner === "X") {
      setScore((prevScore) => ({ ...prevScore, x: prevScore.x + 1 }));
    } else {
      setScore((prevScore) => ({ ...prevScore, o: prevScore.o + 1 }));
    }
    resetGame();
  };

  const handleDraw = () => {
    alert("It's a draw!");
    setScore((prevScore) => ({ ...prevScore, draws: prevScore.draws + 1 }));
    resetGame();
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setBoard(history[step].squares);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setHistory([]);
    setStepNumber(0);
  };

  const renderSquare = (index: number) => {
    const isXChecked = board[index] === "X";
    const isOChecked = board[index] === "O";
    return (
      <button
        className={`square ${isXChecked ? "checked-x" : isOChecked ? "checked-o" : ""}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
        <span>{`Player: ${step.player}`}</span>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="scoreboard">
        <div className="wins-x">
          <p className="player">X</p>
          <p>wins {score.x}</p>
        </div>
        <div className="wins-o">
          <p className="player">O</p>
          <p>wins {score.o}</p>
        </div>
        <div className="draws">
          <p><i className="fa-solid fa-scale-balanced"></i></p>
          <p>draws {score.draws}</p>
        </div>
      </div>
      <table rules="all" className="board">
        <tbody>
          <tr>
            {[0, 1, 2].map((index) => (
              <td key={index}>{renderSquare(index)}</td>
            ))}
          </tr>
          <tr>
            {[3, 4, 5].map((index) => (
              <td key={index}>{renderSquare(index)}</td>
            ))}
          </tr>
          <tr>
            {[6, 7, 8].map((index) => (
              <td key={index}>{renderSquare(index)}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="status">
        <button className={xIsNext ? "active" : ""}>X</button>
        <button className={!xIsNext ? "active" : ""}>O</button>
      </div>
      <div className="history">
        <h2>History</h2>
        <ul>{moves}</ul>
      </div>
    </div>
  );
};

const calculateWinner = (squares: Array<string | null>): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
