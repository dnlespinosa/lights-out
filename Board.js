import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const genRandom = () => {
  let num = Math.floor(Math.random() * 2) +1
  if (num === 1) {
    return false
  } else {
    return true
  }
}


function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    

    // TODO: create array-of-arrays of true/false values

    // HOW DO I CLEAN THIS UP
    for (let i=0; i<{nrows}; i++) {
      let colArr = []
      for (let y=0; y<ncols; y++) {
        let val = genRandom()
        colArr.push(val)
      }
      initialBoard.push(colArr)
    };
    return initialBoard;
  }

  function hasWon(board) {
    // TODO: check the board in state to determine whether the player has won.
    function checkVal(letter) {
      return letter === false
    }
    function isWinner(arr) {
      return arr.filter(checkVal)
    }
    const winning = board.filter(isWinner)

    if (winning.length === nrows) {
      return true
    } else {
      return false
    }

  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const deepBoardCopy = oldBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it
      // BARF DUDE, clean this up with Anh
      flipCell(y, x, deepBoardCopy)
      flipCell(y-1, x, deepBoardCopy)
      flipCell(y+1, x, deepBoardCopy)
      flipCell(y, x-1, deepBoardCopy)
      flipCell(y, x+1, deepBoardCopy)
      


      // TODO: return the copy

      return deepBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon(board)) {
    return (
      <div>
        <h1>YOU WON!!!!!!!</h1>
      </div>
    )
  }

  // make table board
  // TODO
  for (let y=0; y<nrows; y++) {
    let rowArr = []
    for (let x=0; x<ncols; x++) {
      let coord = `${y}-${x}`
      rowArr.push(
        <Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={() => flipCellsAround(coord)} />
      )
    }
  }



  return (
    <table className='Board'>
      <tbody>{gameBoard}</tbody>
    </table>
  )


}

export default Board;


