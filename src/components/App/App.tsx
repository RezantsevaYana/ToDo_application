import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Header/Header';
import ProjectsList from '../ProjectsList/ProjectsList';
import TasksList from '../TasksList/TasksList';
import AddTaskForm from '../AddTasksForm/AddTasksForm';
import { getPopups } from 'store/popups/selectors';
import { togglePopup, closeALLPopups } from 'store/popups/action';


function App() {
  const dispatch = useDispatch();
  const popups = useSelector(getPopups);
  const { addTaskPopup } = popups;

  const propsTogglePopup = (popup: string) => {
    dispatch(togglePopup(popup));
  };

  const closeAllPopups = () => {
    dispatch(closeALLPopups());
  };

  const handleOpenAddTaskPopup = () => {
    propsTogglePopup('addTaskPopup');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProjectsList />} />
          <Route path='/tasks' element={<TasksList openAddTaskPopup={handleOpenAddTaskPopup} />} />
        </Routes>
      </BrowserRouter>
      <footer className="footer"></footer>
      <AddTaskForm isOpen={addTaskPopup} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
