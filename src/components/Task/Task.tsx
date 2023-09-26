import React from 'react';
import './Task.scss';
import { TaskType } from '../TasksList/TasksList';

type PropsType = {
  task: TaskType
}

function Task(props: PropsType) {

  console.log(props.task);

  const returnPriority = () => {
    if (props.task.priority === 'hight') {
      return 'высокий'
    }

    if (props.task.priority === 'medium') {
      return 'средний'
    }

    if (props.task.priority === 'low') {
      return 'низкий'
    }
  }

  const returnStatus = () => {
    if (props.task.status === 'queue') {
      return 'открыта'
    }

    if (props.task.status === 'development') {
      return 'в работе'
    }

    if (props.task.status === 'done') {
      return 'завершена'
    }
  }

  return (
    <article className='task'>
      <p className='task__project'>{props.task.projects.title}</p>
      <h3 className='task__title'>{props.task.title}</h3>
      <p className='task__description'>{props.task.description}</p>

      <div className='task__dates'>
        <p className='task__date'>дата создания: {props.task.startDate}</p>
        <p className='task__date'>дата окончания: {props.task.finalDate}</p>
        <p className='task__date'>время в работе: {props.task.deltaDay}</p>
      </div>

      <div className='task__info'>
        <p className='task__prioritet'>приоритет: <span>{returnPriority()}</span></p>
        <p className='task__status'>текущий статус: <span>{returnStatus()}</span></p>
      </div>
    </article>
  );
}

export default Task;
