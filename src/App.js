import React, { Component, Fragment } from "react";
import Calendar from "./Calendar";
import moment from "moment";
import "moment/locale/ru";
import Cell from "./Calendar/Cell";
import Header from "./Header";

export default class App extends Component {
  state = {
    date: moment(),
    tooltipOpened: false,
    openedDate: null
  };
  setToday = () => {
    this.setState({ date: moment() });
  };
  renderExample = () => {
    if (!localStorage.data) {
      localStorage.data = JSON.stringify([
        {
          date: "1547665200000",
          content: {
            event: "Сделать ТЗ",
            names: "Егор",
            description: "Здесь должно быть описание"
          }
        }
      ]);
    }
  };
  componentWillMount() {
    this.renderExample();
  }

  render() {
    let counter = 7;
    return (
      <Fragment>
        <Header />
        <Calendar
          onChangeMonth={date => this.setState({ date })}
          date={this.state.date}
          renderDay={({ day, classNames, onPickDate }) => {
            counter--;
            if (counter >= 0) {
              return (
                <Cell
                  key={day.format("x")}
                  day={day}
                  classNames={classNames}
                  dayName={
                    day
                      .format("dddd")
                      .charAt(0)
                      .toUpperCase() +
                    day.format("dddd").slice(1) +
                    ", "
                  }
                />
              );
            }
            return (
              <Cell key={day.format("x")} day={day} classNames={classNames} />
            );
          }}
          renderHeader={({ date, onPrevMonth, onNextMonth }) => (
            <div className="Calendar-header">
              <button onClick={onPrevMonth}>
                <i className="fas fa-angle-left" />
              </button>
              <div className="Calendar-header-currentDate">
                {date
                  .format("MMMM YYYY")
                  .charAt(0)
                  .toUpperCase() + date.format("MMMM YYYY").slice(1)}
              </div>
              <button onClick={onNextMonth}>
                <i className="fas fa-angle-right" />
              </button>
              <button onClick={this.setToday}>Сегодня</button>
            </div>
          )}
        />
      </Fragment>
    );
  }
}
