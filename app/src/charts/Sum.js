import React from 'react';

import { sum, minBy, maxBy, omit } from 'lodash';
import * as d3 from "d3";

import { ScatterChart, Scatter, CartesianGrid, Tooltip } from 'recharts';
import { XAxis, YAxis, ZAxis } from 'recharts';

import { formatter } from './utils';

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

    const xDomain = [games[0].time, games[games.length - 1].time];
    const yDomain = [minBy(games, 'sum').sum, maxBy(games, 'sum').sum];

    // Show by sum
    return (
      <ScatterChart width={1400} height={400}>
        <XAxis label="Date" dataKey={'time'} domain={xDomain} tickFormatter={formatter} />
        <YAxis label="Sum" dataKey={'sum'} domain={yDomain} />

        <Scatter data={games} fill="#50ABD2" />

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

export default Sum;
