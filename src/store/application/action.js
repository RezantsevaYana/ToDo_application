export const ActionType = {
  ADD_PROJECT: 'application/addProject',
  DELETE_PROJECT: 'application/deleteProject',
  ADD_TASK: 'application/addTask',
  DELETE_TASK: 'application/deleteTask',
  UPDATE_TASKS: 'application/updateTasks',
  SORT_TASKS: 'application/sortTasks',
}

const addProject = (project) => ({
  type: ActionType.ADD_PROJECT,
  payload: project,
});

const deleteProject = (projectId) => ({
  type: ActionType.DELETE_PROJECT,
  payload: projectId,
});

const addTask = (task) => ({
  type: ActionType.ADD_TASK,
  payload: task,
});

const deleteTask = (task) => ({
  type: ActionType.DELETE_TASK,
  payload: task,
})

const updateTasks = (projectId) => ({
  type: ActionType.UPDATE_TASKS,
  payload: projectId
});


const sortTasks = (tasks) => ({
  type: ActionType.SORT_TASKS,
  payload: tasks
});


export { addProject, deleteProject, addTask, deleteTask, updateTasks, sortTasks };
