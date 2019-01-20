import React, { Component } from 'react';
import './styles.sass';

class Tooltip extends Component {
  state = {
    event: '',
    names: '',
    description: '',
  };

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      this.setState({
        event: data.content.event,
        names: data.content.names,
        description: data.content.description,
      });
    }
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveData = () => {
    const { event, names, description } = this.state;
    const { day, openTooltip, updateCell } = this.props;

    if (event && names) {
      if (this.checkToExists()) {
        const prevData = JSON.parse(localStorage.getItem('data'));
        const newData = prevData.filter(el => +el.date !== +day.format('x'));
        localStorage.setItem('data', JSON.stringify(newData));
      }
      const prevData = JSON.parse(localStorage.getItem('data'));
      const newDataItem = {
        date: day.format('x'),
        content: { event, names, description },
      };
      const newData = [...prevData, newDataItem];
      localStorage.setItem('data', JSON.stringify(newData));
      openTooltip();
      updateCell();
    } else alert('Введите данные');
  };

  clearData = () => {
    const { day, openTooltip, clearData } = this.props;
    if (this.checkToExists()) {
      const prevData = JSON.parse(localStorage.getItem('data'));
      const newData = prevData.filter(el => +el.date !== +day.format('x'));
      localStorage.setItem('data', JSON.stringify(newData));
      clearData();
      openTooltip();
    } else {
      alert('Вы еще ничего не запланировали на данное число');
    }
  };

  checkToExists = () => {
    const { day } = this.props;
    const data = JSON.parse(localStorage.getItem('data')).filter(
      el => +el.date === +day.format('x'),
    );
    if (data.length) return true;
    return false;
  };

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
    const { openTooltip } = this.props;
    return (
      <div ref={this.setWrapperRef} className="Tooltip">
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
        <div>
          <button type="button" onClick={this.saveData} className="Tooltip-button">
            {'Готово'}
          </button>
          <button type="button" onClick={this.clearData} className="Tooltip-button">
            {'Удалить'}
          </button>
        </div>
        <button type="button" onClick={openTooltip} className="fas fa-times Tooltip-close" />
      </div>
    );
  }
}

export default Tooltip;
