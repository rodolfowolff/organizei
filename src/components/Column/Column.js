import React from 'react';
import Task from '../Task/Task';

import './Column.scss';

function Column() {
  return (
    <div className='column'>
      <header>A fazer</header>
      <ul className="task-list">
        <Task />
        <Task />
        <Task />
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
