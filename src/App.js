import React, { Component, Fragment } from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import 'moment/locale/ru';
import Cell from './Calendar/Cell';
import Header from './Header';

export default class App extends Component {
  state = {
    currentDate: moment(),
  };

  componentWillMount() {
    this.renderExample();
  }

  setToday = () => {
    this.setState({ currentDate: moment() });
  };

  renderExample = () => {
    if (!localStorage.data) {
      localStorage.data = JSON.stringify([
        {
          date: '1547665200000',
          content: {
            event: 'Митинг на болотной',
            names: 'Володя Пу, Дима Мищечкин',
            description: 'Тестовое задание для iQ-dev',
          },
        },
      ]);
    }
  };

  render() {
    let counter = 7;
    const { currentDate } = this.state;
    return (
      <Fragment>
        <Header />
        <Calendar
          onChangeMonth={date => this.setState({ currentDate: date })}
          date={currentDate}
          renderDay={({ day, classNames }) => {
            counter -= 1;
            if (counter >= 0) {
              return (
                <Cell
                  key={day.format('x')}
                  day={day}
                  classNames={classNames}
                  dayName={`${day
                    .format('dddd')
                    .charAt(0)
                    .toUpperCase()}${day.format('dddd').slice(1)}, `}
                />
              );
            }
            return <Cell key={day.format('x')} day={day} classNames={classNames} />;
          }}
          renderHeader={({ date, onPrevMonth, onNextMonth }) => (
            <div className="Calendar-header">
              <button type="button" onClick={onPrevMonth}>
                <i className="fas fa-angle-left" />
              </button>
              <div className="Calendar-header-currentDate">
                {date
                  .format('MMMM YYYY')
                  .charAt(0)
                  .toUpperCase() + date.format('MMMM YYYY').slice(1)}
              </div>
              <button type="button" onClick={onNextMonth}>
                <i className="fas fa-angle-right" />
              </button>
              <button type="button" onClick={this.setToday}>
                {'Сегодня'}
              </button>
            </div>
          )}
        />
      </Fragment>
    );
  }
}
