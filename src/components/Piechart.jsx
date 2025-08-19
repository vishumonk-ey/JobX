import React, { useState } from "react";
import {
  Pie,
  ResponsiveContainer,
  Sector,
  Tooltip,
  Cell,
  PieChart,
} from "recharts";

function Piechart({ data }) {
  console.log(data);

  const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F87171"];
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      value,
      midAngle,
    } = props;
    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={fill}
          className="text-sm font-semibold"
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };
  const [activeIndex, setactiveIndex] = useState(0);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          nameKey="status"
          //   fill="purple"
          onMouseEnter={(_, index) => setactiveIndex(index)}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: "8px" }}
          // formatter={(value , status , name)=>[` Vlaue : ${value}` ,` Status : ${status}` , `${name}`]}
          // labelFormatter={(value)=>{
          //   return `label : ${value}`

          // }}
          formatter={(value, name) => [value, name]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Piechart;
