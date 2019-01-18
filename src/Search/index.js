import React, { Component, Fragment } from 'react';
import Autosuggest from 'react-autosuggest';
import moment from 'moment';
import 'moment/locale/ru';

import './styles.sass';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const events = JSON.parse(localStorage.getItem('data'));
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp(escapedValue, 'i');
  return events.filter(event => {
    return regex.test(event.content.event) || regex.test(event.content.names);
  });
}

function getSuggestionValue(suggestion) {
  return suggestion.content.event;
}

function renderSuggestion(suggestion) {
  return (
    <Fragment>
      <span className="react-autosuggest__suggestion__title">{suggestion.content.event}</span>
      <span className="react-autosuggest__suggestion__date">
        {moment(+suggestion.date).format('D MMMM')}
      </span>
    </Fragment>
  );
}

export default class Search extends Component {
  state = {
    value: '',
    suggestions: [],
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Событие или участник',
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
