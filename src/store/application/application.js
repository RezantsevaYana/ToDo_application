import { ActionType } from './action';
import { projects, updateProjectsInLocalStorage, initialTaskCard, tasks } from '../../util';


const initialState = {
  projects: [...projects],
  tasks: [...tasks],
};



const deleteProjectInStore = (projects, payload) => {
  const newProjects = projects.filter(project => project.id !== payload);
  updateProjectsInLocalStorage(newProjects);
  return newProjects;
}

const addProjectInStore = (projects, payload) => {
  const newProjects = [...projects, payload]
  updateProjectsInLocalStorage(newProjects);
  return newProjects;
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
    default:
      return state;
  }
};

export { applications };
