import React from 'react';
import './Project.scss';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../store/application/action';

type PropsType = {
  title: string,
  id: string,
}

function Project(props: PropsType) {
  const dispatch = useDispatch();

  const deleteProjectHandler = () => {
    dispatch(deleteProject(props.id));
  }

  return (
    <li className='project'>
      <h3 className='project__title'>{props.title}</h3>
      <button className='project__delete' onClick={deleteProjectHandler}></button>
    </li>
  )
}

export default Project;
