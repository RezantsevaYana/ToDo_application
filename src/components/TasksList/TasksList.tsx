import React from 'react';
import './TasksList.scss';
import Task from '../Task/Task';
import { useSelector } from 'react-redux';
import { getTasks } from '../../store/application/selectors';
import { ProjectType } from '../ProjectsList/ProjectsList';

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

function TasksList() {
  const tasks = useSelector(getTasks);


  const returnOpensTasks = () => {
    return tasks.filter((task: TaskType) => task.status === 'queue');
  }


  const returnDevelopmentsTasks = () => {
    return tasks.filter((task: TaskType) => task.status === 'development');
  }

  const returnDoneTasks = () => {
    return tasks.filter((task: TaskType) => task.status === 'done');
  }


  return (
    <section className='tasks'>

      <div className='tasks__category'>
        <p className='tasks__category-title'>открыта</p>
        {
          returnOpensTasks().map((task: TaskType) => (
            <Task key={task.id} task={task} />
          ))
        }
      </div>

      <div className='tasks__category'>
        <p className='tasks__category-title'>в разработке</p>
        {
          returnDevelopmentsTasks().map((task: TaskType) => (
            <Task key={task.id} task={task} />
          ))
        }
      </div>

      <div className='tasks__category'>
        <p className='tasks__category-title'>выполнена</p>
        {
          returnDoneTasks().map((task: TaskType) => (
            <Task key={task.id} task={task} />
          ))
        }
      </div>

    </section>
  )
}

export default TasksList;
