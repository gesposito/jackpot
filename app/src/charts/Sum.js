import React from 'react';

import { sum, minBy, maxBy, omit } from 'lodash';
import moment from 'moment';
import * as d3 from "d3";

import { ScatterChart, Scatter, CartesianGrid, Tooltip } from 'recharts';
import { XAxis, YAxis, ZAxis } from 'recharts';

const Sum = React.createClass({
  render: function() {
    const { data, filters } = this.props;

    const games = (data).map((game) => {
      const numbers = omit(game.Draft, filters);
      const values  = Object.keys(numbers || {}).map((k) => numbers[k]);

      return {
        'sum'   : sum(values),
        'time'  : new Date(game.date).getTime(),
      };
    });

    const yDomain = [minBy(games, 'sum').sum, maxBy(games, 'sum').sum];
    const xDomain = [games[0].time, games[games.length - 1].time];

    // Show by sum
    return (
      <ScatterChart width={1400} height={400} margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
        <YAxis label="Sum" dataKey={'sum'} domain={yDomain} />
        <XAxis label="Date" dataKey={'time'} domain={xDomain} tickFormatter={formatter}/>

        <Scatter data={games} />

        <Tooltip content={<SumTooltip />} />
        <CartesianGrid />
      </ScatterChart>
    );
  }

});

const SumTooltip = React.createClass({
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

export default Sum;
