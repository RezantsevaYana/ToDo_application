import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';
import Header from '../Header/Header';
import ProjectsList from '../ProjectsList/ProjectsList';
import TasksList from '../TasksList/TasksList';
import { useSelector } from 'react-redux';
import { getProjects } from '../../store/application/selectors';

function App() {
  const proj = useSelector(getProjects);

  console.log(proj)

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProjectsList />} />
          <Route path='/tasks' element={<TasksList />} />
        </Routes>
      </BrowserRouter>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
