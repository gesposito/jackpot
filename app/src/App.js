import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import { ScatterChart, Scatter, CartesianGrid, Tooltip, Legend,
 XAxis, YAxis, ZAxis, ReferenceLine, ReferenceDot, ReferenceArea } from 'recharts';

import { sum, minBy, maxBy, includes, pull, omit } from 'lodash';
import moment from 'moment';
import * as d3 from "d3";

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
    const games = (gamesFetch.value).map((game) => {
      const numbers = omit(game.Draft, filters);
      const values  = Object.keys(numbers || {}).map((k) => numbers[k]);

      // omit
      return {
        'sum'   : sum(values),
        'time'  : new Date(game.date).getTime(),
      };
    });

    const yDomain = [minBy(games, 'sum').sum, maxBy(games, 'sum').sum];
    const xDomain = [games[0].time, games[games.length - 1].time];

    // Show by sum
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
        <ScatterChart width={1400} height={400} margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
          <YAxis label="Sum" dataKey={'sum'} domain={yDomain} />
          <XAxis label="Date" dataKey={'time'} domain={xDomain} tickFormatter={formatter}/>

          <Scatter data={games} />

          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid />
        </ScatterChart>
      </div>
    );
  },

});

const CustomTooltip = React.createClass({
  render() {
    const { active, payload, label } = this.props;

    return (
      <div style={{ 'backgroundColor': '#FFF', 'padding': 10 }}>
        <p>Sum: {payload[1].value}</p>
        <p>Date: {formatter(payload[0].value)}</p>
      </div>
    );
  }
});

const formatter = (time) => {
  return moment(time).format('MM/DD/YYYY');
};

export default connect(
  (props) => ({
    'gamesFetch': `${api.url}/games/latest`,
  })
)(App);
