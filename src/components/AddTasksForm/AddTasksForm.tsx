import React, { useState, useRef, RefObject, ChangeEvent } from "react";
import './AddTasksForm.scss';
import { getProjects } from "../../store/application/selectors";
import { useSelector, useDispatch } from "react-redux";
import { ProjectType } from '../ProjectsList/ProjectsList';
import { priorityList, currentDate, formateDate } from '../../util';
import { v1 } from 'uuid';
import { addTask } from '../../store/application/action';

type PropsType = {
  isOpen: boolean
  onClose: () => void
}

function AddTaskForm(props: PropsType) {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const selectProject: RefObject<HTMLButtonElement> = useRef(null);
  const selectPriority: RefObject<HTMLButtonElement> = useRef(null);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [priotityOpen, setPriotityOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null)


  const handleCreateTask = () => {
    let priority;

    if (selectPriority.current?.textContent === 'высокий') {
      priority = 'hight';
    }

    if (selectPriority.current?.textContent === 'средний') {
      priority = 'medium';
    }

    if (selectPriority.current?.textContent === 'низкий') {
      priority = 'low';
    }

    let task = {
      id: v1(),
      title: name,
      description: description,
      startDate: formateDate(currentDate),
      finalDate: null,
      deltaDay: null,
      status: 'queue',
      projects: {
        id: selectProject.current?.id,
        title: selectProject.current?.textContent,
      },
      priority: priority,
    }

    if (name.trim() === '') {
      setError('введите название задачи')
      return;
    }

    dispatch(addTask(task));

    setName('');
    setDescription('');
    setError('');
    setProjectsOpen(false);
    setPriotityOpen(false)


    handleClosePopup()
  }

  const handleClosePopup = () => {
    props.onClose()
  }

  const handleListProjectToggle = () => {
    setProjectsOpen(!projectsOpen);
  }

  const handleListPriorityToggle = () => {
    setPriotityOpen(!priotityOpen);
  }

  const handleProjectSelect = (project: ProjectType) => {
    if (selectProject.current) {
      selectProject.current.textContent = project.title;
      selectProject.current.id = project.id;
    }
    handleListProjectToggle();
  }

  const handlePrioritytSelect = (priority: any) => {
    if (selectPriority.current) {
      selectPriority.current.textContent = priority.title;
    }
    handleListPriorityToggle();
  }

  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value) };
  const onChangeDescriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => { setDescription(e.target.value) };


  return (
    <section className={`popup popup__add-task ${props.isOpen ? 'popup_show' : ' '}`}>
      <div className="popup__background" onClick={handleClosePopup}></div>
      <div className="popup__wrapper">

        <div className="select-list__container">
          <p className="select-list__title">выберете проект</p>
          <button ref={selectProject} className="select-list__button" onClick={handleListProjectToggle} id={projects[0]?.id}>{projects[0]?.title}</button>
          <ul className={`select-list ${projectsOpen ? 'select-list_open' : ''}`}>
            {
              projects.map((project: ProjectType) => (
                <li key={project.id} className="select-list__item" onClick={() => handleProjectSelect(project)}>{project.title}</li>
              ))
            }
          </ul>
        </div>

        <div className="select-list__container">
          <p className="select-list__title">Название задачи</p>
          <input
            value={name || ''}
            onChange={onChangeNameHandler}
            className="task-input"
            placeholder="Введите название задачи" />
          {error && <span className="span-error">{error}</span>}
        </div>

        <div className="select-list__container">
          <p className="select-list__title">Описание задачи</p>
          <textarea
            value={description || ''}
            onChange={onChangeDescriptionHandler}
            className="task-description__input"
            placeholder="Введите описание задачи"></textarea>
        </div>


        <div className="select-list__container">
          <p className="select-list__title">Установите приоритет</p>
          <button ref={selectPriority} className="select-list__button" onClick={handleListPriorityToggle}>высокий</button>
          <ul className={`select-list ${priotityOpen ? 'select-list_open' : ''}`}>
            {
              priorityList.map((priority) => (
                <li key={priority.id} className="select-list__item" onClick={() => handlePrioritytSelect(priority)}>{priority.title}</li>
              ))
            }
          </ul>
        </div>

        <button className="popup__button" onClick={handleCreateTask}>создать задачу</button>
      </div>
    </section>
  );
}

export default AddTaskForm;
