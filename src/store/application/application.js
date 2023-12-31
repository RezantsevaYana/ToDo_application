import { ActionType } from './action';
import { projects, updateProjectsInLocalStorage, tasks, updateTasksInLocalStorage } from '../../util/util';


export const initialState = {
  projects: [...projects],
  tasks: [...tasks],
};



const deleteProjectInStore = (projects,payload) => {
  const newProjects = projects.filter(project => project.id !== payload);
  updateProjectsInLocalStorage(newProjects);
  return newProjects;
}

const addProjectInStore = (projects, payload) => {
  const newProjects = [...projects, payload]
  updateProjectsInLocalStorage(newProjects);
  return newProjects;
}

const addTaskInStore = (tasks, payload) => {
  const newTasks = [...tasks, payload]
  updateTasksInLocalStorage(newTasks);
  return newTasks;
}

const deleteTaskInStore = (tasks, payload) => {
  const newTasks = tasks.filter(task => task.id !== payload);
  updateTasksInLocalStorage(newTasks);
  return newTasks;
}

const updateTasksInStore = (tasks, payload) => {
  const newTasks = tasks.filter(task => task.projects.id !== payload);
  updateTasksInLocalStorage(newTasks);
  return newTasks;
}


const applications = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_PROJECT:
      return {
        ...state,
        projects: addProjectInStore(state.projects, action.payload),
      };
    case ActionType.DELETE_PROJECT:
      return {
        ...state,
        projects: deleteProjectInStore(state.projects, action.payload),
      };
    case ActionType.ADD_TASK:
      return {
        ...state,
        tasks: addTaskInStore(state.tasks, action.payload),
      };
    case ActionType.DELETE_TASK:
      return {
        ...state,
        tasks: deleteTaskInStore(state.tasks, action.payload),
      };
    case ActionType.UPDATE_TASKS:
      return {
        ...state,
        tasks: updateTasksInStore(state.tasks, action.payload),
      };
    case ActionType.SORT_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export { applications };
