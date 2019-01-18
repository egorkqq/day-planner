import React, { Component } from "react";
import moment from "moment";
import cx from "classnames";
import Tooltip from "./../Tooltip";
class Cell extends Component {
  state = { tooltipOpened: false, data: undefined };
  openTooltip = e => {
    this.setState(prevState => {
      return {
        tooltipOpened: !prevState.tooltipOpened
      };
    });
  };
  getDataFromStorage = () => {
    const data = JSON.parse(localStorage.getItem("data")).filter(
      el => +el.date === +this.props.day.format("x")
    );
    if (data.length) this.setState({ data: data[0] });
  };
  componentDidMount() {
    this.getDataFromStorage();
  }
  render() {
    const { day, classNames, dayName } = this.props;
    const { tooltipOpened, data } = this.state;
    return (
      <div
        className={cx(
          "Calendar-grid-item",
          day.isSame(moment(), "day") && "Calendar-grid-item--current",
          classNames
        )}
      >
        <div className="Calendar-grid-item-content" onClick={this.openTooltip}>
          {dayName}
          {day.format("D")}
          {data && (
            <div>
              <div className="Calendar-grid-item-title">
                {data.content.event}
              </div>
              <div className="Calendar-grid-item-people">
                {data.content.names}
              </div>
            </div>
          )}
          <div />
        </div>
        {tooltipOpened && (
          <Tooltip
            day={day}
            openTooltip={this.openTooltip}
            updateCell={this.getDataFromStorage}
          />
        )}
      </div>
    );
  }
}

export default Cell;
