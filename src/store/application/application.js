import { ActionType } from './action';
import { initialProjects } from '../../util'

const initialState = {
  projects: [...initialProjects],
};


const applications = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
};

export { applications };
