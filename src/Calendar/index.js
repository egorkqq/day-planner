import React, { Component } from 'react';
import cx from 'classnames';
import createDateObjects from './createDateObjects';
import './styles.sass';

export default class Calendar extends Component {
  handleNextMonth = () => {
    if (this.props.onNextMonth) {
      return this.props.onNextMonth();
    }
    this.props.onChangeMonth(this.props.date.clone().add(1, 'months'));
  };

  handlePrevMonth = () => {
    if (this.props.onPrevMonth) {
      return this.props.onPrevMonth();
    }
    this.props.onChangeMonth(this.props.date.clone().subtract(1, 'months'));
  };

  render() {
    const {
      date,
      weekOffset,
      renderDay,
      renderHeader,
      onPickDate,
      contentClassName,
      containerClassName,
    } = this.props;

    return (
      <div className={cx('Calendar', containerClassName)}>
        {renderHeader({
          date,
          onPrevMonth: this.handlePrevMonth,
          onNextMonth: this.handleNextMonth,
        })}
        <div className={cx('Calendar-grid', contentClassName)}>
          {createDateObjects(date, weekOffset).map(day => renderDay({ ...day, onPickDate }))}
        </div>
      </div>
    );
  }
}
