import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { MakeBoard } from './Board';
import { Login } from './Login';
import { Logout } from './Logout';
import { Display } from './Display';
import { LeaderBoard } from './LeaderBoard';

export const socket = io();

function App() {
  // These are all of my variables for the game. Yeah, it's a lot.
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [users, setUser] = useState([]);
  const [scores, setScores] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkUser, setCheckUser] = useState(null);
  const [currentLetter, setCurrentLetter] = useState('');
  const [isXNext, setIsXNext] = useState(true);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [isLead, setIsLead] = useState(null);
  let currentWindow;
  let logoutButton;
  let theWinnerIsStatement;
  let resetButton;
  let leaderBoardButton;
  let leader;
  /* useEffect(() => {
    return function cleanup(){
      socket.emit('logout',checkUser);
    }
  }); */
  // Just updates the scores of users.
  useEffect(() => {
    socket.on('winner', (data) => {
      setScores([...data.ordered_users]);
    });
    return function cleanup() {
      socket.off('winner');
    };
  }, []);
  // This is just for updating currentWinner to null.
  useEffect(() => {
    socket.on('reset', (data) => {
      if (data.message === true) setCurrentWinner(null);
    });
  }, []);
  // Calculated winner function to emit to winner socket and update scores accordingly.
  function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (
        squares[a]
        && squares[a] === squares[b]
        && squares[a] === squares[c]
      ) {
        if (currentWinner === null) {
          setCurrentWinner(squares[a]);
          if (currentLetter === squares[a]) {
            socket.emit('winner', { username: checkUser, status: 'winner' });
          } else if (currentLetter !== '') {
            socket.emit('winner', { username: checkUser, status: 'loser' });
          }
          return 'Player '.concat(squares[a]);
        }
        setCurrentWinner(null);
      }
    }
    return null;
  }

  /* reset function. nxt is false because the listener for
  tictactoe sets isXNext to the opposite of nxt. */
  function reset() {
    setBoard(['', '', '', '', '', '', '', '', '']);
    setIsXNext(true);
    setCurrentWinner(null);
    socket.emit('tictactoe', {
      message: ['', '', '', '', '', '', '', '', ''],
      nxt: false,
    });
    socket.emit('reset', { message: true });
  }
  // Conditionals
  if (!isLoggedIn) {
    currentWindow = <Login setUser={setUser} setCheckUser={setCheckUser} setIsLoggedIn={setIsLoggedIn}/>;
    logoutButton = null;
    theWinnerIsStatement = null;
    resetButton = null;
  } /* Log in button was clicked. */ else {
    // Sets up board.
    currentWindow = board.map((ifIsx, index) => (
      <MakeBoard ifX={ifIsx} id={index} currentLetter={currentLetter} isXNext={isXNext} setBoard={setBoard} setIsXNext={setIsXNext} board={board}/>
    ));
    // Checks if anybody's won yet.
    if (currentWinner === null) {
      calculateWinner(board);
    }
    // Functional logout button.
    logoutButton = <Logout setIsLoggedIn={setIsLoggedIn} currentLetter={currentLetter} setBoard={setBoard} setCheckUser={setCheckUser}
    setCurrentLetter={setCurrentLetter} setIsXNext={setIsXNext} setUser={setUser} setCurrentWinner={setCurrentWinner} 
    checkUser={checkUser} setScores={setScores} setIsLead={setIsLead}/>;

    /* Passing setUserLetter to tell the program if the user is X or O,
    but I'm going to remove this for milestone. */
    leaderBoardButton = (
      <LeaderBoard
        users={users}
        currentUser={checkUser}
        setCurrentLetter={setCurrentLetter}
        setIsLead={setIsLead}
        setUser={setUser}
        setScores={setScores}
      />
    );
    if (isLead) {
      <table>
        <thead>
          <tr>
            <th colSpan="2">The table header</th>
          </tr>
        </thead>
        <tbody>
          {
            (leader = scores.map((currentUser) => (
              <Display
                name={currentUser.username}
                number={currentUser.score}
                currentUser={checkUser}
                currentLetter={currentLetter}
              />
            )))
          }
        </tbody>
      </table>;
    }
    theWinnerIsStatement = <h1>The winner is: </h1>;
    resetButton = <button type="button" onClick={reset}>Reset</button>;
  }

  // Now Heroku doesn't want to deploy.
  return (
    <div>
      <div className="board">{currentWindow}</div>
      <div className="logoutbutton">
        {logoutButton}
        {resetButton}
      </div>
      <div className="leaderboardbutton">
        {leaderBoardButton}
        {leader}
      </div>
      <div className="victor">
        {theWinnerIsStatement}
        {currentWinner}
      </div>
    </div>
  );
}

export default App;
