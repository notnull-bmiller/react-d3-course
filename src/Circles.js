import React, { useRef, useState, useEffect } from "react";
import { getData } from "./utils";
import { scaleLinear, max, min, extent, range, scaleOrdinal, select } from "d3";

const Circles = ({ width, height }) => {
  const [data, setData] = useState(getData());
  const svgRef = useRef();

  useEffect(() => {
    const maxRadius = 40;
    const xScale = scaleLinear().domain([0, 1]).range([0, width]);
    const yScale = scaleLinear().domain([0, 1]).range([height, 0]);
    const rScale = scaleLinear().domain([0, 1]).range([0, maxRadius]);
    const colorScale = scaleOrdinal()
      .domain(range(5))
      .range(["red", "blue", "green", "yellow", "orange"]);

    select(svgRef.current)
      .selectAll("circle")
      .data(data)
      .transition()
      .duration(1000)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", (d) => rScale(d.r))
      .attr("fill", (d) => colorScale(d.color));

    select(svgRef.current)
      .selectAll("rect")
      .data(data)
      .transition()
      .duration(1000)

      .attr("fill", (d) => colorScale(d.color));
  }, [data, width, height]);

  return (
    <div>
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="circles">
        {data.map((d, i) => (
          <circle />
        ))}
        {data.map((d, i) => (
          <rect />
        ))}
      </svg>
      <div>
        <button onClick={() => setData(getData())}>Refresh Data</button>
      </div>
    </div>
  );
};
export default Circles;
