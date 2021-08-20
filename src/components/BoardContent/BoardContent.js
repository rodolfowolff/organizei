import React, { useEffect, useState } from 'react';

import { Container, Draggable } from 'react-smooth-dnd';
import { isEmpty } from 'lodash';

import Column from '../Column/Column';

import { mapOrder } from '../../utilities/sorts';
import { applyDrag } from '../../utilities/dragDrop';

import { InitialData } from '../../actions/initialData';

import PlusIcon from '../../images/plus-icon.svg';
import './BoardContent.scss';

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

  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((col) => col.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);

  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removed !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];

      let currentColumn = newColumns.find((col) => col.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i.id);

      setColumns(newColumns);
    }
  };

  return (
    <div className='board-content'>
      <Container
        orientation="horizontal"
        onDrop={ onColumnDrop }
        dragHandleSelector=".column-drag-handle"
        getChildPayload={ (index) => columns[index] }
        dropPlaceholder={ {
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview"
        } }
      >
        { columns.map((column, index) => (
          <Draggable key={ index }>
            <Column column={ column } onCardDrop={ onCardDrop } />
          </Draggable>
        )) }
      </Container>
      <div className='add-new-column'>
        <img src={ PlusIcon } alt="plus icon" className='plus-icon' />
        Add another column
      </div>
    </div>
  );
}

export default BoardContent;
