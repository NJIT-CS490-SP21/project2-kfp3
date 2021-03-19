import React, { useState, useRef, useEffect } from 'react';
import './Board.css';
import PropTypes from 'prop-types';
import { socket } from './App.js';
export function MakeBoard(props) {
  const { ifX, id, currentLetter, isXNext, setBoard, setIsXNext, board} = props;

  /* Changes the value of each square. currentLetter is
  telling the program if the user is X or O.
  It has nothing to do with the square's value.
  This function also tells the program if X is next. */
  function onClickButton(clickedId) {
    if (currentLetter !== 'X' && currentLetter !== 'O') {
      return null;
    }
    if (
      (isXNext && currentLetter === 'X')
      || (!isXNext && currentLetter === 'O')
    ) {
      setBoard((prevBoard) => {
        const temp = [...prevBoard];
        if (
          temp[parseInt(clickedId, 10)] !== 'X'
          && temp[parseInt(clickedId, 10)] !== 'O'
        ) {
          temp[parseInt(clickedId, 10)] = currentLetter;
        }
        setIsXNext(!isXNext);
        socket.emit('tictactoe', { message: temp, nxt: isXNext });
        return temp;
      });
    }
    return board;
  }
  
  return (
    <button type="button" className="box" data-testid={id} id={id} onClick={() => onClickButton(id)}>
      {ifX}
    </button>
  );
}
MakeBoard.propTypes = {
  ifX: PropTypes.string,
  id: PropTypes.number,
  currentLetter: PropTypes.string,
  isXNext: PropTypes.bool,
  setBoard: PropTypes.func,
  setIsXNext: PropTypes.func,
  board: PropTypes.array
};

MakeBoard.defaultProps = {
  ifX: '',
  id: null,
  currentLetter: '',
  isXNext: true,
  setBoard: null,
  setIsXNext: null,
  board: ["","","","","","","","",""]
};
export default MakeBoard;
