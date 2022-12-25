import * as React from "react";
import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Diagram = ({ dataKey = "", flow = [] }) => {
  const steam = [...flow].map((item, id) => {
    return {
      name: id,
      [dataKey]: item,
      impression: 0,
    };
  });
  const [state, setState] = React.useState({
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+10",
    bottom: "dataMin-10",
    animation: true,
  });

  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      <ResponsiveContainer height={400} width={"100%"}>
        <LineChart
          data={steam}
          onMouseDown={(e) =>
            setState({ ...state, refAreaLeft: e.activeLabel })
          }
          onMouseMove={(e) =>
            state.refAreaLeft &&
            setState({ ...state, refAreaRight: e.activeLabel })
          }
        >
          <CartesianGrid />
          <XAxis
            dataKey="name"
            domain={[state.left, state.right]}
            type="number"
          />
          <YAxis domain={[state.bottom, state.top]} type="number" yAxisId="1" />
          <Tooltip />
          <Line
            yAxisId="1"
            type="linear"
            dataKey={dataKey}
            stroke="#8884d8"
            dot={false}
            animationDuration={500}
          />
          {state.refAreaLeft && state.refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              x1={state.refAreaLeft}
              x2={state.refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
          <Brush />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Diagram;
