import React, { Component } from 'react';
import createDateObjects from './createDateObjects';
import './styles.sass';

export default class Calendar extends Component {
  handleNextMonth = () => {
    const { onChangeMonth, date } = this.props;
    onChangeMonth(date.clone().add(1, 'months'));
  };

  handlePrevMonth = () => {
    const { onChangeMonth, date } = this.props;
    onChangeMonth(date.clone().subtract(1, 'months'));
  };

  render() {
    const { date, renderDay, renderHeader } = this.props;
    return (
      <div className="Calendar">
        {renderHeader({
          date,
          onPrevMonth: this.handlePrevMonth,
          onNextMonth: this.handleNextMonth,
        })}
        <div className="Calendar-grid">{createDateObjects(date).map(day => renderDay(day))}</div>
      </div>
    );
  }
}
