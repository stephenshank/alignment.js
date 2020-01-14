import React, { useEffect } from "react";
import { vertical_scroll } from "../helpers/scroll_events";

function BaseSequenceAxis(props) {
  const { sequenceData, labelPadding, siteSize, width } = props,
    labels = sequenceData.map(record => record.header);
  return (
    <g
      style={{
        fontFamily: "Courier",
        fontSize: 14
      }}
      transform={`translate(${props.translateX}, ${props.translateY})`}
    >
      {labels.map((label, i) => {
        return (
          <text
            x={width - labelPadding}
            y={(i + 1) * siteSize}
            textAnchor="end"
            dy={-siteSize / 3}
            key={i}
            onClick={props.onClick(label, i)}
          >
            {label}
          </text>
        );
      })}
    </g>
  );
}

BaseSequenceAxis.defaultProps = {
  translateX: 0,
  translateY: 0,
  onClick: (label, i) => () => null
};

function SequenceAxis(props) {
  const div_id = props.id + "-labels-div";
  useEffect(() => {
    vertical_scroll(div_id);
  });
  if (!props.sequenceData) {
    return <div id={div_id} />;
  }
  const { width, height, siteSize } = props,
    number_of_sequences = props.sequenceData.length,
    styles = {
      overflowX: "scroll",
      overflowY: "hidden",
      width: width,
      height: height
    },
    full_height = siteSize * number_of_sequences;
  return (
    <div
      id={div_id}
      style={styles}
      onWheel={e => {
        e.preventDefault();
        props.scrollBroadcaster.handleWheel(e, props.sender);
      }}
    >
      <svg id="alignmentjs-labels" width={width} height={full_height}>
        <BaseSequenceAxis {...props} />
      </svg>
    </div>
  );
}

SequenceAxis.defaultProps = {
  labelPadding: 10,
  siteSize: 20,
  id: "alignmentjs",
  sender: "main",
  onClick: (label, i) => () => null
};

export default SequenceAxis;
export { BaseSequenceAxis };
