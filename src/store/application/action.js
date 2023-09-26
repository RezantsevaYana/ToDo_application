export const ActionType = {
  ADD_PROJECT: 'application/addProject',
}

const addProject = (project) => ({
  type: ActionType.ADD_PROJECT,
  payload: project,
});

export { addProject };
