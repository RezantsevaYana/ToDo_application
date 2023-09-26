import React, { KeyboardEvent, ChangeEvent, useState } from "react";
import './AddProjectForm.scss';


type PropsType = {
  addProjects: (value: string) => void
}


function AddProjectForm(props: PropsType) {

    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.target.value) }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
          addProjects();
        }
    }

    const addProjects = () => {
        if (value.trim() === '') {
            setError('введите название проекта')
            return;
        }
        props.addProjects(value.trim());
        setValue('');
    }


    return (
        <div className="form">
            <div className="form-input__container">
                <input value={value || ''}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}
                    className={`form__input ${error ? 'error' : ''}`}
                    placeholder="Новый проект" />
                <button className="add-project__button" onClick={addProjects}>+</button>
            </div>
            {error && <span className='error-message'>{error}</span>}
        </div>
    )
}

export default AddProjectForm;
