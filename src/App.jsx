import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS.js";

const INITIAL_GAME_STATE = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_STATE.map(array => [...array])];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    return gameBoard
}

function deriveActivePlayer(turns) {
    let currentPlayer = 'X';
    if (turns.length && turns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function deriveWinner(gameBoard, players) {
    let winner  = undefined;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns)
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
      setGameTurns((prevTurns) => {
          const currentPlayer = deriveActivePlayer(prevTurns);
          const updatedTurns = [
              {square: { row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
          return updatedTurns
      })
  }

  function handleRestartGame() {
      setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
      setPlayers(prevPlayers => {
          return {
              ...prevPlayers,
              [symbol]: newName
          }
      })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === 'X'}
              onChangePlayerName={handlePlayerNameChange}/>
          <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === 'O'}
              onChangePlayerName={handlePlayerNameChange}/>
        </ol>
          {(winner || hasDraw) &&
              <GameOver
                  winner={winner}
                  onRestartGame={handleRestartGame} />}
        <GameBoard
            board={gameBoard}
            onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
