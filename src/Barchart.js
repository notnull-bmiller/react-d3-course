/**
 * Renders a bar chart component with the provided data.
 *
 * @param {object} props - The component props.
 * @param {number} props.width - The width of the bar chart.
 * @param {number} props.height - The height of the bar chart.
 * @param {Array<{sunshine: number}>} props.data - The data to be displayed in the bar chart.
 * @returns {JSX.Element} - The bar chart component.
 */
import React from "react";
import { scaleLinear, scaleBand, max } from "d3";

const Barchart = ({ width, height, data }) => {
  const margin = 10;
  const lines = [10, 20, 30, 40];
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.sunshine)])
    .range([margin, width - margin]);

  const yScale = scaleBand()
    .domain(data)
    .range([0, height - 2 * margin]);

  const rectangles = data.map((d) => {
    return (
      <rect
        key={d.city}
        x={margin}
        y={yScale(d)}
        height={yScale.bandwidth()}
        width={xScale(d.sunshine)}
        fill="darkorange"
        stroke="#FFF"
      ></rect>
    );
  });
  const labels = data.map((d) => {
    return (
      <text fill="#FFF" textAnchor="end" key={d.city} x={xScale(d.sunshine)} y={yScale(d) + 15}>
        {d.city}
      </text>
    );
  });

  const gridLines = lines.map((l, i) => {
    return (
      <g key={i}>
        <line
          y1={0}
          y2={height - margin}
          x1={xScale(l)}
          x2={xScale(l)}
          stroke="#FFF"
          strokeWidth="1"
        ></line>
        <text textAnchor="middle" fontSize="12px" x={xScale(l)} y={height - margin}>
          {l}
        </text>
      </g>
    );
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      {rectangles}
      {gridLines}
      {labels}
    </svg>
  );
};

export default Barchart;
