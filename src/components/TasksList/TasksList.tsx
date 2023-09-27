import React, { DragEvent, useState } from 'react';
import './TasksList.scss';
import Task from '../Task/Task';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../../store/application/selectors';
import { ProjectType } from '../ProjectsList/ProjectsList';
import { sortTasks } from '../../store/application/action';
import { updateTasksInLocalStorage } from '../../util';

export type TaskStatusType = 'queue' | 'development' | 'done';
export type TaskPriorityType = 'low' | 'medium' | 'hight';

export type TaskType = {
  id: string
  title: string
  description: string
  status: TaskStatusType
  priority: TaskPriorityType
  startDate: string
  finalDate: number
  deltaDay: number
  projects: ProjectType
}

type PropsType = {
  openAddTaskPopup: () => void
}

function TasksList(props: PropsType) {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const [currentCard, setCurrentCard] = useState<TaskType>()


  const returnOpensTasks = () => {
    return tasks.filter((task: TaskType) => task.status === 'queue');
  }


  const returnDevelopmentsTasks = () => {
    return tasks.filter((task: TaskType) => task.status === 'development');
  }

  const returnDoneTasks = () => {
    return tasks.filter((task: TaskType) => task.status === 'done');
  }

  const handleOpenAddTaskPopup = () => {
    props.openAddTaskPopup()
  }


  const dragStartHandler = (e: DragEvent<HTMLElement>, task: TaskType) => {
    setCurrentCard(task);
  }

  const dragLeaveHandler = (e: DragEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'white'

  }

  const dragEndHandler = (e: DragEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'white'
  }

  const dragOverHandler = (e: DragEvent<HTMLElement>, targetTask: TaskType) => {
    e.currentTarget.style.background = 'lightgrey'

    console.log(targetTask.id, currentCard?.id)

    if (currentCard && currentCard !== targetTask) {
      console.log(targetTask.id, currentCard.id)
      const currentIndex = tasks.findIndex((task: TaskType) => task === currentCard);
      const targetIndex = tasks.findIndex((task: TaskType) => task === targetTask);

      if (currentIndex !== -1 && targetIndex !== -1) {
        const newTasks = [...tasks];
        [newTasks[currentIndex], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[currentIndex]];
        updateTasksInLocalStorage(newTasks);
        dispatch(sortTasks(newTasks));
      }
    }
  }


  const dropHandler = (e: DragEvent<HTMLElement>, task: TaskType) => {
  }

  return (
    <section className='tasks-page'>
      <button className='add-task-btn' onClick={handleOpenAddTaskPopup}>Добавить задачу</button>
      <div className='tasks'>
        {
          tasks.length === 0 && <p className='tasks-list__empty'>список задач пуст</p>
        }
        {tasks.length !== 0 &&
          <>
            <div className='tasks__category'>
              <p className='tasks__category-title'>открыта</p>
              {
                returnOpensTasks().map((task: TaskType) => (
                  <Task key={task.id} task={task}
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, task)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e, task)}
                    onDrop={(e) => dropHandler(e, task)} />
                ))
              }
            </div>

            <div className='tasks__category'>
              <p className='tasks__category-title'>в разработке</p>
              {
                returnDevelopmentsTasks().map((task: TaskType) => (
                  <Task key={task.id} task={task}
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, task)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e, task)}
                    onDrop={(e) => dropHandler(e, task)} />
                ))
              }
            </div>

            <div className='tasks__category'>
              <p className='tasks__category-title'>выполнена</p>
              {
                returnDoneTasks().map((task: TaskType) => (
                  <Task key={task.id} task={task}
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, task)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e, task)}
                    onDrop={(e) => dropHandler(e, task)} />
                ))
              }
            </div>
          </>
        }
      </div>
    </section>

  )
}

export default TasksList;
