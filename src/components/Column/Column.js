import React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import Card from '../Card/Card';

import PlusIcon from '../../images/plus-icon.svg';
import './Column.scss';

import { mapOrder } from '../../utilities/sorts';

function Column(props) {
  const { column, onCardDrop } = props;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  return (
    <div className='column'>
      <header className="column-drag-handle">{ column.title }</header>
      <div className="card-list">
        <Container
          orientation="vertical"
          groupName="app-columns"
          onDrop={ (dropResult) => onCardDrop(column.id, dropResult) }
          getChildPayload={ (index) => cards[index] }
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={ {
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          } }
          dropPlaceholderAnimationDurarion={ 200 }
        >
          { cards.map((card, index) => (
            <Draggable key={ index }>
              <Card card={ card } />
            </Draggable>
          )
          ) }
        </Container>
      </div>
      <footer>
        <div className='footer-actions'>
          <img src={ PlusIcon } alt="plus icon" className='plus-icon' />
          Add another card
        </div>
      </footer>
    </div>
  );
}

export default Column;
