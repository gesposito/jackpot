import React from 'react';

import { sum, minBy, maxBy, omit } from 'lodash';
import * as d3 from "d3";

import { LineChart, Line, CartesianGrid, Tooltip, Legend } from 'recharts';
import { XAxis, YAxis, ZAxis } from 'recharts';

import { formatter } from './utils';

const Report = React.createClass({
  render: function() {
    const { data, filters } = this.props;

    const reports = (data).map((report) => {
      return {
        ...report,
        'time': new Date(report.date).getTime(),
      };
    });

    // Show Reports
    return (
      <LineChart width={1400} height={400} data={reports}>
        <XAxis dataKey="time" tickFormatter={formatter} />
        <YAxis label="values" />

        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />

        <Line dataKey="firstQuartile" name="first quartile" stroke="#50ABD2" />
        <Line dataKey="mean" name="mean" stroke="#78B653" />
        <Line dataKey="median" name="median" stroke="#CAD04F" />
        <Line dataKey="standardDev" name="standard deviation" stroke="#ED913D" />
        <Line dataKey="thirdQuartile" name="third quartile" stroke="#E8182E" />
      </LineChart>
    );
  }

});

export default Report;
