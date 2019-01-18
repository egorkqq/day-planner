import React, { Component } from 'react';
import moment from 'moment';
import cx from 'classnames';
import Tooltip from '../Tooltip';

class Cell extends Component {
  state = {
    tooltipOpened: false,
    data: undefined,
  };

  componentDidMount() {
    this.getDataFromStorage();
  }

  openTooltip = () => {
    this.setState(prevState => {
      return {
        tooltipOpened: !prevState.tooltipOpened,
      };
    });
  };

  getDataFromStorage = () => {
    const { day } = this.props;
    const data = JSON.parse(localStorage.getItem('data')).filter(
      el => +el.date === +day.format('x'),
    );
    if (data.length) {
      this.setState({
        data: data[0],
      });
    }
  };

  clearData = () => {
    this.setState({ data: undefined });
  };

  render() {
    const { day, classNames, dayName } = this.props;
    const { tooltipOpened, data } = this.state;
    return (
      <div
        className={cx(
          'Calendar-grid-item',
          day.isSame(moment(), 'day') && 'Calendar-grid-item--current',
          classNames,
        )}
      >
        <div
          role="gridcell"
          tabIndex="0"
          className="Calendar-grid-item-content"
          onClick={this.openTooltip}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              this.openTooltip();
            }
          }}
        >
          <div className="Calendar-grid-item-day">
            {dayName}
            {day.format('D')}
          </div>
          {data && (
            <div>
              <div className="Calendar-grid-item-title">{data.content.event}</div>
              <div className="Calendar-grid-item-people">{data.content.names}</div>
            </div>
          )}
          <div />
        </div>
        {tooltipOpened && (
          <Tooltip
            data={data}
            day={day}
            openTooltip={this.openTooltip}
            updateCell={this.getDataFromStorage}
            clearData={this.clearData}
          />
        )}
      </div>
    );
  }
}

export default Cell;
