import React, { Component } from "react";
import { scaleLinear } from "d3-scale";

import { vertical_scroll } from "../helpers/scroll_events";

class BaseSequenceBarPlot extends Component {
  componentDidMount() {
    vertical_scroll.call(this);
  }
  handleWheel(e) {
    e.preventDefault();
    this.props.scroll_broadcaster.handleWheel(e, this.props.sender);
  }
  render() {
    const {
        width,
        height,
        div_id,
        scale,
        color,
        outline,
        site_size
      } = this.props,
      data = this.props.data || [],
      container_style = {
        width: width,
        height: height,
        overflowY: "scroll"
      };
    return (
      <div
        id={div_id}
        style={container_style}
        onWheel={e => this.handleWheel(e)}
      >
        <svg width={width} height={site_size * data.length}>
          {data
            ? data.map((datum, i) => {
                return (
                  <rect
                    x={scale(0)}
                    y={i * site_size}
                    width={scale(datum) - scale(0)}
                    height={site_size}
                    fill={color}
                    stroke={outline}
                    key={i}
                  />
                );
              })
            : null}
        </svg>
      </div>
    );
  }
}

BaseSequenceBarPlot.defaultProps = {
  width: 500,
  height: 500,
  color: "red",
  outline: "black",
  div_id: "alignmentjs-bar",
  site_size: 20,
  left_bar_padding: 10,
  right_bar_padding: 20,
  sender: "main"
};

export default BaseSequenceBarPlot;
