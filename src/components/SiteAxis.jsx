import React, { useEffect } from "react";
import { AxisTop } from "d3-react-axis";
import * as d3 from "d3";

import { horizontal_scroll } from "../helpers/scroll_events";

function SiteCanvasAxis(props) {
  useEffect(() => {
    horizontal_scroll("alignmentjs-axis-div");
  }, []);
  if (!props.sequenceData) return <div id="alignmentjs-axis-div" />;
  const { width, height, siteSize } = props,
    { number_of_sites } = props.sequenceData,
    alignment_width = siteSize * number_of_sites,
    scale = d3
      .scaleLinear()
      .domain([1, number_of_sites])
      .range([siteSize / 2, alignment_width - siteSize / 2]),
    tickValues = d3.range(1, number_of_sites, 2);
  return (
    <div
      id="alignmentjs-axis-div"
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
        width: width,
        heught: height
      }}
      onWheel={e => {
        e.preventDefault();
        props.scrollBroadcaster.handleWheel(e, props.sender);
      }}
    >
      <svg id="alignmentjs-axis" width={alignment_width} height={props.height}>
        <AxisTop
          scale={scale}
          tickValues={tickValues}
          transform={`translate(0,${height - 2})`}
        />
      </svg>
    </div>
  );
}

function SiteSVGAxis(props) {
  if (!props.sequenceData) return <g />;
  const { width, height, siteSize } = props,
    { number_of_sites } = props.sequenceData,
    start_site = props.svg.sites[0],
    alignment_width = siteSize * number_of_sites,
    scale = d3
      .scaleLinear()
      .domain([start_site + 1, start_site + number_of_sites])
      .range([siteSize / 2, alignment_width - siteSize / 2]),
    axis_start_site = 2 * Math.ceil(start_site / 2),
    tickValues = d3.range(axis_start_site + 1, start_site + number_of_sites, 2);
  return (
    <g
      height={props.height}
      width={props.width}
      transform={`translate(${props.translateX}, ${props.translateY})`}
    >
      <AxisTop
        scale={scale}
        tickValues={tickValues}
        transform={`translate(0,${height - 1})`}
      />
    </g>
  );
}

function SiteAxis(props) {
  if (!props.svg) return <SiteCanvasAxis {...props} />;
  return <SiteSVGAxis {...props} />;
}

SiteAxis.defaultProps = {
  siteSize: 20,
  sender: "main"
};

export default SiteAxis;
