import React from "react";
import './AddTasksForm.scss';

type PropsType = {
  isOpen: boolean
  onClose: () => void
}

function AddTaskForm(props: PropsType) {

  const handleCreateTask = () => {
    handleClosePopup()
  }

  const handleClosePopup = () => {
    props.onClose()
  }

  return (
    <section className={`popup popup__add-task ${props.isOpen ? 'popup_show' : ' '}`}
      onClick={(e) => (e.currentTarget === e.target) && handleClosePopup}>
      <div className="popup__background"></div>
      <div className="popup__wrapper">

        <button className="popup__button" onClick={handleCreateTask}>создать задачу</button>
      </div>
    </section>
  );
}

export default AddTaskForm;
