import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { socket } from './App';
export function LeaderBoard(props) {
  const {
    users, currentUser, setCurrentLetter, setIsLead, setUser, setScores
  } = props;
  useEffect(() => {
    socket.on('logout', (data) => {
      setUser([...data.users]);
      setScores([...data.ordered_users]);
    });
  });
  const num = users.indexOf(currentUser);
  console.log(users);
  console.log(currentUser,num)
  // Tells the user if they're X, O or a spectator.
  function setUserLetter(number, name) {
    if (name === currentUser && number === 0) {
      setCurrentLetter('X');
    } else if (name === currentUser && number === 1) {
      setCurrentLetter('O');
    }
  }
  setUserLetter(num, currentUser);
  /* Tells the program if the user clicked the leaderboard button
  was clicked to activate the conditional. */
  function leaderBoard() {
    setIsLead((prev) => !prev);
  }
  return <button type="button" onClick={() => leaderBoard()}>Leader Board</button>;
}

LeaderBoard.propTypes = {
  setIsLead: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.string),
  currentUser: PropTypes.string,
  setCurrentLetter: PropTypes.func,
  setUser: PropTypes.func,
  setScores: PropTypes.func
};

LeaderBoard.defaultProps = {
  setIsLead: null,
  users: [],
  currentUser: '',
  setCurrentLetter: null,
  setUser: null,
  setScores: null
};

export default LeaderBoard;
