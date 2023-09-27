import React from 'react';
import './Project.scss';
import { useDispatch } from 'react-redux';
import { deleteProject, updateTasks } from '../../store/application/action';
import { NavLink } from 'react-router-dom';

type PropsType = {
  title: string,
  id: string,
}

function Project(props: PropsType) {
  const dispatch = useDispatch();

  const deleteProjectHandler = () => {
    dispatch(deleteProject(props.id));
    dispatch(updateTasks(props.id));
  }

  return (
    <li className='project'>
      <NavLink to={``} className='project__link'>
        <h3 className='project__title'>{props.title}</h3>
      </NavLink>
      <button className='project__delete' onClick={deleteProjectHandler}></button>
    </li>
  )
}

export default Project;
