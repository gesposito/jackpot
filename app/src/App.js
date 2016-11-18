import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import { ScatterChart, Scatter, CartesianGrid, Tooltip, Legend,
 XAxis, YAxis, ZAxis, ReferenceLine, ReferenceDot, ReferenceArea } from 'recharts';

import { sum, minBy, maxBy } from 'lodash';
import moment from 'moment';
import * as d3 from "d3";

import './App.css';

import { api } from '../config/config';

const App = React.createClass({
  render() {
    const { gamesFetch } = this.props

    if (gamesFetch.pending) {
      return <div>Loading...</div>
    } else if (gamesFetch.rejected) {
      return <div>{gamesFetch.reason}</div>
    }

    // gamesFetch.fulfilled
    const games = (gamesFetch.value).map((game) => {
      const numbers = game.Draft;
      const values  = Object.keys(numbers || {}).map((k) => numbers[k]);

      // omit
      return {
        'sum'   : sum(values),
        'time'  : new Date(game.date).getTime(),
      };
    });

    const yDomain = [minBy(games, 'sum'), maxBy(games, 'sum')];
    const xDomain = [games[0].time, games[games.length - 1].time];

    // Show by sum
    return (
      <div className="App">
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
