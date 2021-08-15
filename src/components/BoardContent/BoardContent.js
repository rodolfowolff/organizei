import React, { useEffect, useState } from 'react';
import Column from '../Column/Column';

import './BoardContent.scss';

import { mapOrder } from '../../utilities/sorts';

import { InitialData } from '../../actions/initialData';
import { isEmpty } from 'lodash';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = InitialData.boards.find((board) => board.id === 'board-1');

    if (boardFromDB) {
      setBoard(boardFromDB);


      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
    }

  }, []);

  if (isEmpty(board)) {
    return <div className="not-found" style={ { 'padding': '10px', 'color': 'white' } }>
      Board not found!
    </div>;
  }

  return (
    <div className='board-content'>
      { columns.map((column, index) =>
        <Column key={ index } column={ column } />
      ) }
    </div>
  );
}

export default BoardContent;
