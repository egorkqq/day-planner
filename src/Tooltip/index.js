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
      if (this.checkToExists()) {
        const prevData = JSON.parse(localStorage.getItem("data"));
        const newData = prevData.filter(el => +el.date !== +day.format("x"));
        localStorage.setItem("data", JSON.stringify(newData));
      }
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

  checkToExists = () => {
    const { day } = this.props;
    const data = JSON.parse(localStorage.getItem("data")).filter(
      el => +el.date === +day.format("x")
    );
    if (data.length) return true;
  };

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      console.log("пишу в тейт");
      this.setState({
        event: data.content.event,
        names: data.content.names,
        description: data.content.description
      });
    }
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
        <div>
          <button onClick={this.saveData} className="Tooltip-button">
            Готово
          </button>
          <button onClick={this.clearData} className="Tooltip-button">
            Удалить
          </button>
        </div>
      </div>
    );
  }
}

export default Tooltip;
