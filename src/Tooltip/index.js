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
  saveData = () => {
    const { event, names, description } = this.state;
    const { day, openTooltip, updateCell } = this.props;
    if (event && names) {
      const prevData = JSON.parse(localStorage.getItem("data"));
      const newDataItem = {
        date: day.format("x"),
        content: { event, names, description }
      };
      const newData = [...prevData, newDataItem];
      localStorage.setItem("data", JSON.stringify(newData));
    } else alert("Введите данные");
    updateCell();
    openTooltip();
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };
  handleClickOutside = event => {
    const { openTooltip } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      openTooltip();
    }
  };

  render() {
    const { event, names, description } = this.state;
    return (
      <div ref={this.setWrapperRef} className="Tooltip">
        <input
          onChange={this.onInput}
          name="event"
          placeholder="Событие"
          type="text"
          value={event}
          className="Tooltip-input"
          maxLength="20"
        />
        <input
          onChange={this.onInput}
          name="names"
          placeholder="Имена участников"
          type="text"
          value={names}
          className="Tooltip-input"
          maxLength="40"
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
        <button onClick={this.saveData} className="Tooltip-button">
          Готово
        </button>
      </div>
    );
  }
}

export default Tooltip;
