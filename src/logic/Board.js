import { comb_Win } from "../Const";

export const checkWinner = (boardToCheck) => {
    for (const combo of comb_Win) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[b] === boardToCheck[c]
      ) {
        //Hay ganador
        return boardToCheck[a];
      }}
      //No hay ganador
      return null
  };