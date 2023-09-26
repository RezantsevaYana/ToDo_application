import { ActionType } from './action';

const initialState = {
  popups: {
    addTaskPopup: false,
  },
};

const popups = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_POPUP:
      return {
        ...state,
        popups: {...state.popups, [action.payload] : !state.popups[action.payload] },
      };
    case ActionType.CLOSE_ALL_POPUPS:
      return {
        ...state,
        popups: {
          addTaskPopup: false,
        },
      };
    default:
      return state;
  }
};
export { popups };
