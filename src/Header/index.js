import React, { Component } from "react";
import Search from "./../Search";
import "./styles.sass";
class Header extends Component {
  state = {};
  render() {
    return (
      <header className="Header">
        <button className="Header-button">Добавить</button>
        <button
          onClick={() => window.location.reload}
          className="Header-button"
        >
          Обновить
        </button>
        <div className="Header-search">
          <i className="fas fa-search Header-search-button" />
          <Search />
        </div>
      </header>
    );
  }
}

export default Header;
