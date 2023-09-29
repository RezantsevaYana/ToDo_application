import React, { useState, ChangeEvent } from "react";
import './SearchForm.scss';


function SearchForm() {
  const [value, setValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.target.value) };

  return (
    <form className="search-form">
      <label className="search-form__title">Поиск задачи</label>
      <input className="search-form__input"
        value={value || ''}
        onChange={onChangeHandler}
        placeholder="введите название задачи"
      ></input>
    </form>
  );
}

export default SearchForm;
