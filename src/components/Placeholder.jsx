import React from "react";

function Placeholder(props) {
  if (!props.svg) {
    return <div style={{ width: props.width, height: props.height }} />;
  }
  return <g style={{ width: props.width, height: props.height }} />;
}

export default Placeholder;
