import React, { Component } from "react";
import "./styles.sass";
class Header extends Component {
  state = {};
  render() {
    return (
      <header className="Header">
        <button className="Header-button">Добавить</button>
        <button className="Header-button">Обновить</button>
        <div className="Header-search">
          <button className="fas fa-search Header-search-button" />
          <input
            tabindex="1"
            className="Header-search-input"
            placeholder="Событие, дата или участник"
          />
        </div>
      </header>
    );
  }
}

export default Header;
