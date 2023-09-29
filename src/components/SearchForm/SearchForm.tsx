import React, { useState, ChangeEvent } from "react";
import './SearchForm.scss';
import { useDispatch } from "react-redux";
import { setSearchStr } from "../../store/filters/action";


function SearchForm() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchStr(e.target.value));
    setValue(e.target.value)
  };

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
