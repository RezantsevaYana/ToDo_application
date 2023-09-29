import React, { useState, useRef, RefObject, ChangeEvent } from "react";
import './AddTasksForm.scss';
import { v1 } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import Datetime from 'react-datetime';
import { ProjectType } from '../ProjectsList/ProjectsList';
import { getProjects } from "store/application/selectors";
import { priorityList } from 'util/util';
import { addTask } from 'store/application/action';


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
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  const handleStartTimeChange = (moment: any) => {
    setStartTime(moment.format("MM/DD/YYYY"));
  };

  const handleEndTimeChange = (moment: any) => {
    setEndTime(moment.format("MM/DD/YYYY"));
  };


  const calculateDifTime = (start: string, end: string) => {
    const startDate = new Date(Date.parse(start));
    const endDate = new Date(Date.parse(end));
    const timeDiff = endDate.getTime() - startDate.getTime();

    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    console.log(daysDiff)

    return daysDiff;
  }





  const handleCreateTask = () => {
    const startDate = new Date(Date.parse(startTime));
    const endDate = new Date(Date.parse(endTime));
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
      startDate: startTime,
      finalDate: endTime,
      deltaDay: calculateDifTime(startTime, endTime),
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

    if (endDate.getTime() < startDate.getTime()) {
      setDateError("Дата окончания задачи не может быть раньше даты начала");
      return;
    }

    dispatch(addTask(task));
    handleClosePopup();
  }

  const handleClosePopup = () => {
    props.onClose();
    setName('');
    setDescription('');
    setError('');
    setProjectsOpen(false);
    setPriotityOpen(false);
    setDateError('')
    setEndDateOpen(false);
    setStartDateOpen(false);
    setStartTime('');
    setEndTime('');
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

  const handleToggleStartDateContainer = () => {
    setStartDateOpen(!startDateOpen);
  }

  const handleToggleEndDateContainer = () => {
    setEndDateOpen(!endDateOpen);
  }


  return (
    <section className={`popup popup__add-task ${props.isOpen ? 'popup_show' : ' '}`}>
      <div className="popup__background" onClick={handleClosePopup}></div>
      <div className="popup__wrapper">
        <div className="task-form__container">
          <div className="select-list__container">
            <p className="select-list__title">выберете проект</p>
            <button ref={selectProject} className={`select-list__button ${projectsOpen ? 'select-list__button_open' : ''}`} onClick={handleListProjectToggle} id={projects[0]?.id}>{projects[0]?.title}</button>
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
            <button ref={selectPriority} className={`select-list__button ${priotityOpen ? 'select-list__button_open' : ''}`} onClick={handleListPriorityToggle}>высокий</button>
            <ul className={`select-list ${priotityOpen ? 'select-list_open' : ''}`}>
              {
                priorityList.map((priority) => (
                  <li key={priority.id} className="select-list__item" onClick={() => handlePrioritytSelect(priority)}>{priority.title}</li>
                ))
              }
            </ul>
          </div>

          <div className="select-list__container">
            <label className={`select-list__title select-list__title_date ${startDateOpen ? 'select-list__title_date_open' : ''}`} onClick={handleToggleStartDateContainer}>Выберете дату начала выполения задачи:</label>
            <div className={`select-date__container ${startDateOpen ? 'select-date__container_open' : ''}`}>
              <Datetime value={startTime} onChange={handleStartTimeChange} dateFormat="DD.MM.YYYY" />
            </div>
            <label className={`select-list__title select-list__title_date ${endDateOpen ? 'select-list__title_date_open' : ''}`} onClick={handleToggleEndDateContainer}>Выберете дату окончания выполения задачи</label>
            <div className={`select-date__container ${endDateOpen ? 'select-date__container_open' : ''}`}>
              <Datetime value={endTime} onChange={handleEndTimeChange} dateFormat="DD.MM.YYYY" />
            </div>
          </div>
        </div>
        {error && <span className="span-error">{error}</span>}
        {dateError && <span className="span-error">{dateError}</span>}
        <button className="popup__button" onClick={handleCreateTask}>создать задачу</button>
      </div>
    </section>
  );
}

export default AddTaskForm;
