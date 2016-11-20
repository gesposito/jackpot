import React from 'react';
import { connect /* , PromiseState */ } from 'react-refetch';

import { includes, pull } from 'lodash';
import Sum from './charts/Sum';

import './App.css';

import { api } from '../config/config';

const App = React.createClass({
  getInitialState() {
    return {
      'filters': [],
    };
  },

  onFilter(field) {
    const { filters } = this.state;

    this.setState({
      'filters': includes(filters, field) ? pull(filters, field) : filters.concat(field)
    });
  },

  render() {
    const { gamesFetch } = this.props
    const { filters } = this.state;
    const { onFilter } = this;

    if (gamesFetch.pending) {
      return <div>Loading...</div>
    } else if (gamesFetch.rejected) {
      return <div>{gamesFetch.reason}</div>
    }

    // gamesFetch.fulfilled
    return (
      <div className="App">
        <div>
          <div>
            Include 'Jolly' number
            <input type="checkbox" checked={!includes(filters, 'jolly')} onChange={(e) => onFilter('jolly')} />
          </div>
          <div>
            Include 'Star' number
            <input type="checkbox" checked={!includes(filters, 'star')} onChange={(e) => onFilter('star')} />
          </div>
        </div>
        <Sum
          data={gamesFetch.value}
          filters={filters}
        />
      </div>
    );
  },

});

export default connect(
  (props) => ({
    'gamesFetch': `${api.url}/games/latest`,
  })
)(App);
