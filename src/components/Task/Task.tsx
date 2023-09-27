import React, { DragEvent } from 'react';
import './Task.scss';
import { TaskType } from '../TasksList/TasksList';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/application/action';
import { BoardType } from '../TasksList/TasksList';

type PropsType = {
  task: TaskType
  board: BoardType
  draggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLElement>, task: TaskType, board: BoardType) => void;
  onDragLeave?: (e: DragEvent<HTMLElement>) => void;
  onDragEnd?: (e: DragEvent<HTMLElement>) => void;
  onDragOver?: (e: DragEvent<HTMLElement>, task: TaskType, board: BoardType) => void;
  onDrop?: (e: DragEvent<HTMLElement>, task: TaskType, board: BoardType) => void;
}

function Task(props: PropsType) {
  const dispatch = useDispatch();

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

  const handleDeleteButton = () => {
    dispatch(deleteTask(props.task.id));
  }



  return (
    <article className='task'
      draggable={true}
      onDragStart={(e) => props.onDragStart && props.onDragStart(e, props.task, props.board)}
      onDragLeave={(e) => props.onDragLeave && props.onDragLeave(e)}
      onDragEnd={(e) => props.onDragEnd && props.onDragEnd(e)}
      onDragOver={(e) => props.onDragOver && props.onDragOver(e, props.task, props.board)}
      onDrop={(e) => props.onDrop && props.onDrop(e, props.task, props.board)}
    >
      <button className='task__delete' onClick={handleDeleteButton}></button>
      <p className='task__project'>{props.task.projects?.title}</p>
      <h3 className='task__title'>{props.task.title}</h3>
      <p className='task__description'>{props.task.description}</p>

      <div className='task__dates'>
        <p className='task__date'>дата создания: {props.task.startDate}</p>
        <p className='task__date'>дата окончания: {props.task.finalDate}</p>
        <p className='task__date'>время в работе: {props.task.deltaDay}</p>
      </div>

      <div className='task__info'>
        <p className={`task__prioritet ${props.task.priority === 'hight' ? 'task__prioritet_red' : ''}`}>приоритет: <span>{returnPriority()}</span></p>
        <p className='task__status'>текущий статус: <span>{returnStatus()}</span></p>
      </div>
    </article>
  );
}

export default Task;
