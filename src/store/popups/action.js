export const ActionType = {
  TOGGLE_POPUP: 'popups/togglePopup',
  CLOSE_ALL_POPUPS: 'popups/closeAllPopups',
};

const togglePopup = (popup) => ({
  type: ActionType.TOGGLE_POPUP,
  payload: popup,
});


const closeALLPopups = () => ({
  type: ActionType.CLOSE_ALL_POPUPS,
});

export { togglePopup, closeALLPopups };
