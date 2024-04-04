import { useState } from "react";
import { Square } from "./components/Spuare"
import { Turn, comb_Win } from "./Const";
import { checkWinner } from "./logic/Board";

function App() {
  //Tablero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  });
  //Turnos
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? Turn.x
  });
  //nul ganador, false empate
  const [winner, setWinner] = useState(null);
  //revisamos la combinaciones y vemos si hay ganador

  //Resetear el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turn.x);
    setWinner(null)
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    //No volver a marcar un casillero ocupado
    if (board[index] || winner) return;
    //Actualiza el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //Cambiar el turno
    const newTurn = turn === Turn.x ? Turn.o : Turn.x;
    setTurn(newTurn);
    // Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('newTurn', turn);
    //Chequear si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner); //Hay ganador
    } if (checkEndGame(newBoard)){
      setWinner(false) //Empate
    }};

  return (
    <main className="board">
      <h1>Ta te ti</h1>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === Turn.x}>{Turn.x}</Square>
        <Square isSelected={turn === Turn.o}>{Turn.o}</Square>
      </section>

      {
      winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>
              {
                winner == false
                ? 'Empate'
                : 'Gano:'
              }
            </h2>

            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Volver a empezar</button>
            </footer>
          </div>
        </section>
      )}
       <button onClick={resetGame}>Volver a empezar</button>
    </main>
  );
}

export default App;
