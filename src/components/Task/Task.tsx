import React from 'react';
import './Task.scss';

function Task() {

  return (
    <article className='task'>
      <p className='task__project'>проект для задачи</p>
      <h3 className='task__title'>задача1</h3>
      <p className='task__description'>описание описание описание задачи</p>

      <div className='task__dates'>
        <p className='task__date'>дата создания: </p>
        <p className='task__date'>дата окончания: </p>
        <p className='task__date'>время в работе: </p>
      </div>

      <div className='task__info'>
        <p className='task__prioritet'>приоритет</p>
        <p className='task__status'>текущий статус</p>
      </div>


    </article>
  );
}

export default Task;
