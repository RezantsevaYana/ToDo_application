import React from 'react';
import './ProjectsList.scss';
import { v1 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'store/application/selectors';
import { addProject } from 'store/application/action'
import Project from '../Project/Project';
import AddProjectForm from '../AddProjectForm/AddProjectForm';

export type ProjectType = {
  id: string
  title: string
}

function ProjectsList() {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);

  const addProjects = (taskTitle: string) => {
    let newTask = {
      id: v1(),
      title: taskTitle,
    };

    dispatch(addProject(newTask));
  }

  return (
    <section className='projects-list__container'>
      <h2 className='projects-list__title'>Список проектов</h2>
      <AddProjectForm addProjects={addProjects} />
      <ul className='projects-list'>
        {
          projects.map((project: ProjectType) => (
            <Project key={project.id} title={project.title} id={project.id} />
          ))
        }
      </ul>
    </section>
  )
}

export default ProjectsList;
