import React, { useEffect } from "react";
import { AxisTop } from "d3-react-axis";
import * as d3 from "d3";

import { horizontal_scroll } from "../helpers/scroll_events";

function SiteAxis(props) {
  useEffect(() => {
    horizontal_scroll("alignmentjs-axis-div");
  }, []);
  if (!props.sequenceData) return <div id="alignmentjs-axis-div" />;
  const { width, height, siteSize, startSite } = props,
    { number_of_sites } = props.sequenceData,
    alignment_width = siteSize * number_of_sites,
    scale = d3
      .scaleLinear()
      .domain([startSite + 1, startSite + number_of_sites])
      .range([siteSize / 2, alignment_width - siteSize / 2]),
    tickValues = d3.range(startSite + 1, startSite + number_of_sites, 2);
  return (
    <div
      id="alignmentjs-axis-div"
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
        width: props.width,
        heught: props.height
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

SiteAxis.defaultProps = {
  siteSize: 20,
  sender: "main",
  startSite: 0
};

export default SiteAxis;
