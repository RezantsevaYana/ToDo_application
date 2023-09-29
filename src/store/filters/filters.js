import { ActionType } from './action';


const initialState = {
  searchStr: '',
};


const filters = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_SEARCH_STR:
      return {
        ...state,
        searchStr: action.payload,
      };
    case ActionType.CLEAR_SEARCH_STR:
    return {
      ...state,
      searchStr: initialState.searchStr,
    }
    default:
      return state;
  }
}

export { filters };
