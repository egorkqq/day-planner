import React, { Component, Fragment } from "react";
import Calendar from "./Calendar";
import moment from "moment";
import "moment/locale/ru";
import cx from "classnames";
import Tooltip from "./Tooltip";
export default class App extends Component {
  state = {
    date: moment(),
    tooltipOpened: false,
    openedDate: null
  };
  setToday = () => {
    this.setState({ date: moment() });
  };
  openTooltip = e => {
    const val = e.target.id;
    this.setState(prevState => {
      console.log(val);
      return {
        tooltipOpened: !prevState.tooltipOpened,
        openedDate: val
      };
    });
  };
  render() {
    let weekdayName = 7;
    const { tooltipOpened, openedDate } = this.state;
    return (
      <Fragment>
        <Calendar
          onChangeMonth={date => this.setState({ date })}
          date={this.state.date}
          onPickDate={date => console.log(date.startOf("month"))}
          renderDay={({ day, classNames, onPickDate }) => {
            while (weekdayName) {
              weekdayName--;
              return (
                <div
                  key={day.format()}
                  className={cx(
                    "Calendar-grid-item",
                    day.isSame(moment(), "day") &&
                      "Calendar-grid-item--current",
                    classNames
                  )}
                  id={day}
                  onClick={this.openTooltip}
                >
                  {tooltipOpened && openedDate === day && <Tooltip />}
                  {day
                    .format("dddd")
                    .charAt(0)
                    .toUpperCase() + day.format("dddd").slice(1)}
                  {",  "}
                  {day.format("D")}
                </div>
              );
            }
            return (
              <div
                id={day}
                onClick={this.openTooltip}
                key={day.format()}
                className={cx(
                  "Calendar-grid-item",
                  day.isSame(moment(), "day") && "Calendar-grid-item--current",
                  classNames
                )}
              >
                {day.format("D")}
              </div>
            );
          }}
          renderHeader={({ date, onPrevMonth, onNextMonth }) => (
            <div className="Calendar-header">
              <button onClick={onPrevMonth}>«</button>
              <div className="Calendar-header-currentDate">
                {date
                  .format("MMMM YYYY")
                  .charAt(0)
                  .toUpperCase() + date.format("MMMM YYYY").slice(1)}
              </div>
              <button onClick={onNextMonth}>»</button>
              <button onClick={this.setToday}>Сегодня</button>
            </div>
          )}
        />
      </Fragment>
    );
  }
}
