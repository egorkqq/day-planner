import React, { Component } from "react";
import "./styles.sass";
class Tooltip extends Component {
  state = {
    event: "",
    names: "",
    description: ""
  };
  onInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { event, names, description } = this.state;
    return (
      <div className="Tooltip">
        <input
          onChange={this.onInput}
          name="event"
          placeholder="Событие"
          type="text"
          value={event}
          className="Tooltip-input"
        />
        <input
          onChange={this.onInput}
          name="names"
          placeholder="Имена участников"
          type="text"
          value={names}
          className="Tooltip-input"
        />
        <textarea
          onChange={this.onInput}
          name="description"
          placeholder="Описание"
          type="text"
          value={description}
          className="Tooltip-textarea"
          rows="5"
        />
        <button className="Tooltip-button">Готово</button>
      </div>
    );
  }
}

export default Tooltip;
