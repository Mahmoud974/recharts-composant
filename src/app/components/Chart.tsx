import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from "recharts";
import { data } from "../db/db";

interface Db {
  day: string;
  amount: number;
}

interface RoundedBarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: { value: number }[];
  coordinate?: { x: number; y: number };
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  coordinate,
}) => {
  if (active && payload && payload.length && coordinate) {
    return (
      <div
        className="p-5 rounded"
        style={{
          backgroundColor: "brown",
          color: "white",
          position: "absolute",
          transform: "translate(-50%, -100%)",
          left: coordinate.x,
          top: coordinate.y,
        }}
      >
        <p>{`$${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const BarChartComponent: React.FC = () => {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  return (
    <ResponsiveContainer className="max-w-sm">
      <BarChart
        width={350}
        height={200}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={48}
      >
        <XAxis
          dataKey="day"
          scale="point"
          padding={{ left: 10, right: 10 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} />

        <Bar
          dataKey="amount"
          className="cursor-pointer"
          onMouseLeave={() => setHoveredBarIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === hoveredBarIndex ? "blue" : "hsl(10, 79%, 65%)"}
              onMouseEnter={() => setHoveredBarIndex(index)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
