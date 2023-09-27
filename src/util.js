import { v1 } from 'uuid';

export const currentDate = new Date();

export const formateDate = (date) => {
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  return currentDay + '.' + currentMonth + '.' + currentYear
}


export const initialProjects = [
  { id: v1(), title: 'Проект1' },
  { id: v1(), title: 'Проект2' },
  { id: v1(), title: 'Проект3' },
  { id: v1(), title: 'Проект4' },
  { id: v1(), title: 'Проект5' },
]


export const updateProjectsInLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
}

export const updateTasksInLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


export const projects = JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];

export const initialTaskCard = [
  { id: v1(),
    title: 'Задача 1',
    projects: projects[0],
    description: 'описание задачи описание описание реализовать todo приложение',
    status: 'queue',
    priority: 'hight',
    startDate: formateDate(currentDate),
    finalDate: null,
    deltaDay: null,
  },

  { id: v1(),
    title: 'Задача 2',
    projects: projects[1],
    description: 'описание задачи описание описание реализовать todo приложение',
    status: 'development',
    priority: 'low',
    startDate: formateDate(currentDate),
    finalDate: null,
    deltaDay: null,
  },

  { id: v1(),
    title: 'Задача 3',
    projects: projects[0],
    description: 'описание hеализовать todo приложение',
    status: 'done',
    priority: 'medium',
    startDate: formateDate(currentDate),
    finalDate: null,
    deltaDay: null,
  },

  { id: v1(),
    title: 'Задача 1',
    projects: projects[1],
    description: 'описание ззовать todo приложение',
    status: 'queue',
    priority: 'medium',
    startDate: formateDate(currentDate),
    finalDate: null,
    deltaDay: null,
  }
]

export const tasks = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];


export const priorityList = [
  { id: 1, title: 'высокий' },
  { id: 2, title: 'средний' },
  { id: 3, title: 'низкий' },
]





