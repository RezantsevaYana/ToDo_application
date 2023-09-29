import React, { ChangeEvent } from "react";
import './SearchForm.scss';
import { useDispatch, useSelector } from "react-redux";
import { setSearchStr } from "store/filters/action";
import { getSerchStr } from "store/filters/selectors";


function SearchForm() {
  const dispatch = useDispatch();
  const searchStr = useSelector(getSerchStr)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchStr(e.target.value));
  };

  return (
    <form className="search-form">
      <label className="search-form__title">Поиск задачи</label>
      <input className="search-form__input"
        value={searchStr || ''}
        onChange={onChangeHandler}
        placeholder="введите название задачи"
      ></input>
    </form>
  );
}

export default SearchForm;
