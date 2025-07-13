import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

function Graph({data}) {
  return (
    <LineChart width={700} height={350} data={data} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
      <CartesianGrid stroke='#aaa' strokeDasharray="5 5"/>
      <Line type="monotone" dataKey="count" stroke='purple' strokeWidth={2} name='Number of applied jobs ' />
      <XAxis dataKey="Date"/>
      <YAxis width="auto" label={{ value: 'Jobs', position: 'insideLeft', angle: -90 }}/>
      <Legend align='center'/>
      <Tooltip/>
    </LineChart>
  )
}

export default Graph