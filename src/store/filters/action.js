export const ActionType = {
  SET_SEARCH_STR: 'filters/setSearchStr',
  CLEAR_SEARCH_STR: 'filters/clearSearchStr',
}

const setSearchStr = (payload) => ({
  type: ActionType.SET_SEARCH_STR,
  payload
});

const clearSearchStr = (payload) => ({
  type: ActionType.CLEAR_SEARCH_STR,
  payload,
});

export { setSearchStr, clearSearchStr }
