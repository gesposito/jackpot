import React from 'react';
import { connect, PromiseState } from 'react-refetch';

import { includes, pull } from 'lodash';

import Sum from './charts/Sum';
import Report from './charts/Report';

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
    }, () => {
      this.props.fetchReports(this.state.filters);
    });
  },

  render() {
    const { gamesFetch, reportsFetch } = this.props
    const { filters } = this.state;
    const { onFilter } = this;

    const allFetches = PromiseState.all([gamesFetch, reportsFetch])

    if (allFetches.pending) {
      return <div>Loading...</div>
    } else if (allFetches.rejected) {
      return <div>{allFetches.reason}</div>
    }

    // gamesFetch.fulfilled
    const [games, reports] = allFetches.value

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
          data={games}
          filters={filters}
        />
        <Report
          data={reports}
          filters={filters}
        />
      </div>
    );
  },

});

export default connect(
  (props) => ({
    'gamesFetch'      : `${api.url}/games/latest`,

    'reportsFetch'    : `${api.url}/reports/latest`,
    'fetchReports'    : filters => ({
      'reportsFetch'  : `${api.url}/reports/latest?filters=${filters}`
    })
  })
)(App);
