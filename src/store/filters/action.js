export const ActionType = {
  ADD_SEARCH_STR: 'filters/addSearchStr',
  CLEAR_SEARCH_STR: 'filters/clearSearchStr',
}

const addSearchStr = (payload) => ({
  type: ActionType.ADD_SEARCH_STR,
  payload
});

const clearSearchStr = (payload) => ({
  type: ActionType.CLEAR_SEARCH_STR,
  payload,
});

export { addSearchStr, clearSearchStr }
