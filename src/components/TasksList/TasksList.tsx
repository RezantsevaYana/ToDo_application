import React, { DragEvent, useState, useEffect } from 'react';
import './TasksList.scss';
import Task from '../Task/Task';
import SearchForm from '../SearchForm/SearchForm';
import { ProjectType } from '../ProjectsList/ProjectsList';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from 'store/application/selectors';
import { sortTasks } from 'store/application/action';
import { getSerchStr } from 'store/filters/selectors';
import { updateTasksInLocalStorage } from 'util/util';
import { searchFilterItems } from 'util/filter';

export type TaskStatusType = 'queue' | 'development' | 'done';
export type TaskPriorityType = 'low' | 'medium' | 'hight';


export type BoardType = {
  id: number,
  title: string,
  items: TaskType
}

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
  const searchStr = useSelector(getSerchStr);
  const [currentCard, setCurrentCard] = useState<TaskType>();
  const [currentBoard, setCurrentBoard] = useState<BoardType>();
  const filteredTasks = searchFilterItems(tasks, searchStr);

  const boards = [
    { id: 1, items: filteredTasks.filter((task: TaskType) => task.status === 'queue'), title: 'открыта' },
    { id: 2, items: filteredTasks.filter((task: TaskType) => task.status === 'development'), title: 'в разработке' },
    { id: 3, items: filteredTasks.filter((task: TaskType) => task.status === 'done'), title: 'выполнена' },
  ]


  function handleOpenAddTaskPopup() {
    props.openAddTaskPopup();
  }

  // dnd для сортировки карточек в пределах одной колонки
  const dragStartHandler = (e: DragEvent<HTMLElement>, task: TaskType, board: BoardType) => {
    setCurrentCard(task);
    setCurrentBoard(board);
  }

  const dragLeaveHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.currentTarget.style.background = 'white';
  }

  const dragEndHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.currentTarget.style.background = 'white';
  }

  const dragOverHandler = (e: DragEvent<HTMLElement>, targetTask: TaskType, board: BoardType) => {
    e.preventDefault()
    e.currentTarget.style.background = 'grey';
    if (currentCard && currentCard !== targetTask) {
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

  const dropHandler = (e: DragEvent<HTMLElement>, targetTask: TaskType, board: BoardType) => {
    e.currentTarget.style.background = 'white';
    e.preventDefault()
  };

  // dnd для перемещения карточек между колонками
  const dragLeaveHandlerBoard = (e: DragEvent<HTMLElement>) => {
    e.currentTarget.style.background = '#f9f9f9';
  }

  const dragEndHandlerBoard = (e: DragEvent<HTMLElement>, targetBoard: BoardType) => {
    e.currentTarget.style.background = 'lightgrey';
    e.preventDefault();
  }

  const dropHandlerBoard = (e: DragEvent<HTMLElement>, targetBoard: BoardType) => {
    e.currentTarget.style.background = '#f9f9f9';
    e.preventDefault()

    const statusMappings: { [key: string]: TaskStatusType } = {
      'открыта': 'queue',
      'в разработке': 'development',
      'выполнена': 'done',
    };

    const taskStatus = statusMappings[targetBoard.title];

    if (taskStatus !== undefined && currentCard) {
      const updatedTasks = tasks.map((task: TaskType) => {
        if (task.id === currentCard.id) {
          return { ...task, status: taskStatus };
        }
        return task;
      });

      dispatch(sortTasks(updatedTasks));
      updateTasksInLocalStorage(updatedTasks);
      return updatedTasks;
    }

    return tasks;
  }


  return (
    <section className='tasks-page'>
      <button className='add-task-btn' onClick={handleOpenAddTaskPopup}>Добавить задачу +</button>
      { tasks.length !== 0 && <SearchForm/> }
      <div className='tasks'>
        {
          tasks.length === 0 && <p className='tasks-list__empty'>список задач пуст</p>
        }
        {
          (filteredTasks.length === 0 && tasks.length !== 0) && <p className='tasks-list__empty'>по вашему запросу ничего не найдено</p>
        }
        {filteredTasks.length !== 0 &&

          boards.map((board) => (
            <div className='tasks__category' key={board.id}
              onDragLeave={(e) => dragLeaveHandlerBoard(e)}
              onDragOver={(e) => dragEndHandlerBoard(e, board)}
              onDrop={(e) => dropHandlerBoard(e, board)} >
              <p className='tasks__category-title'>{board.title}</p>
              {
                board.items.map((task: TaskType) => (
                  <Task key={task.id} task={task} board={board}
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, task, board)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e, task, board)}
                    onDrop={(e) => dropHandler(e, task, board)} />
                ))
              }
            </div>
          ))
        }
      </div>
    </section>

  )
}

export default TasksList;
