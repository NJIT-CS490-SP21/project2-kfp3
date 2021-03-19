import './App.css';
import React from 'react';
import PropTypes from 'prop-types';
import { socket } from './App';
export function Logout(props) {
  const { setIsLoggedIn, currentLetter, setBoard, setCheckUser, setCurrentLetter, setIsXNext, setUser, setCurrentWinner, checkUser, setScores, setIsLead } = props;
  // Wasn't required but I figured what the heck. Still isn't perfect.
  function onLogout() {
    setIsLoggedIn(false);
    socket.emit('logout', checkUser);
    if(currentLetter!=''){
      setBoard(['', '', '', '', '', '', '', '', '']);
      socket.emit('tictactoe', { message: ['', '', '', '', '', '', '', '', ''] });
      setCurrentLetter('');
      setIsXNext(false);
      setUser([]);
      setCheckUser(null);
      setCurrentWinner(null);
      setScores([]);
      setIsLead(false);
    }
  }
  return (
    <div>
      <button type="button" onClick={() => onLogout()}>Logout</button>
    </div>
  );
}

Logout.propTypes = {
  setIsLoggedIn: PropTypes.func,
  currentLetter: PropTypes.string,
  setBoard: PropTypes.func,
  setCheckUser: PropTypes.func,
  setCurrentLetter: PropTypes.func,
  setIsXNext: PropTypes.func,
  setUser: PropTypes.func,
  setCurrentWinner: PropTypes.func,
  checkUser: PropTypes.string,
  setScores: PropTypes.func,
  setIsLead: PropTypes.func
};

Logout.defaultProps = {
  setIsLoggedIn: null,
  currentLetter: '', 
  setBoard: null, 
  setCheckUser: null, 
  setCurrentLetter: null, 
  setIsXNext: null, 
  setUser: null, 
  setCurrentWinner: null, 
  checkUser: '',
  setScores: null,
  setIsLead: null
};

export default Logout;
