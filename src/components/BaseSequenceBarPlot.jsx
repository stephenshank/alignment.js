import React, { Component } from "react";
import { scaleLinear } from "d3-scale";

class BaseSequenceBarPlot extends Component {
  componentDidMount() {
    const { div_id } = this.props;
    document
      .getElementById(div_id)
      .addEventListener("alignmentjs_wheel_event", function(e) {
        $(`#${div_id}`).scrollTop(e.detail.y_pixel);
      });
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
      data = this.props.data || [];
    return (
      <div id={div_id} style={{ width: width, height: height }}>
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
  right_bar_padding: 20
};

export default BaseSequenceBarPlot;
