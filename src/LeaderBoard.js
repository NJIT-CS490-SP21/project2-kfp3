import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

export function LeaderBoard(props) {
  const {
    users, currentUser, setCurrentLetter, setIsLead
  } = props;
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
};

LeaderBoard.defaultProps = {
  setIsLead: null,
  users: [],
  currentUser: '',
  setCurrentLetter: null,
};

export default LeaderBoard;
