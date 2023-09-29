import React from "react";
import './SearchForm.scss';


function SearchForm() {
  return (
    <form className="search-form">
      <label className="search-form__title">Поиск задачи</label>
      <input className="search-form__input"></input>
    </form>
  );
}

export default SearchForm;
