import React from 'react';
import './TasksList.scss';
import Task from '../Task/Task';

function TasksList() {

  return (
    <section className='tasks'>
      <div className='tasks__category'>
        <p className='tasks__category-title'>открыта</p>
        <Task />
      </div>
      <div className='tasks__category'>
        <p className='tasks__category-title'>в разработке</p>
        <Task />
      </div>
      <div className='tasks__category'>
        <p className='tasks__category-title'>выполнена</p>
        <Task />
      </div>

    </section>
  )
}

export default TasksList;
