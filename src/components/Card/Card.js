import React from 'react';

import './Card.scss';

function Card(props) {
  const { card } = props;

  return (
    <li className="card-item">
      { card.title && card.title }
    </li>
  );
}

export default Card;
