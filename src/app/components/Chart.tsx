import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps,
  ReferenceArea,
} from "recharts";
import { data } from "../db/db";

interface Db {
  day: string;
  amount: number;
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
          backgroundColor: "#3B2518",
          color: "white",
          position: "absolute",
          padding: "6px",
          left: coordinate.x,
          top: coordinate.y - 45,
          transform: "translateX(-50%)",
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
    <ResponsiveContainer className="max-w-sm mt-12">
      <BarChart
        width={350}
        height={200}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={35}
        barCategoryGap={11}
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
          radius={[4, 4, 4, 4]}
          onMouseLeave={() => setHoveredBarIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === hoveredBarIndex ? "#B5DEE4" : "hsl(10, 79%, 65%)"}
              onMouseEnter={() => setHoveredBarIndex(index)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
