export const ActionType = {
  ADD_PROJECT: 'application/addProject',
  DELETE_PROJECT: 'application/deleteProject',
}

const addProject = (project) => ({
  type: ActionType.ADD_PROJECT,
  payload: project,
});

const deleteProject = (projectId) => ({
  type: ActionType.DELETE_PROJECT,
  payload: projectId,
});

export { addProject, deleteProject };
