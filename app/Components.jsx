import React, { Component } from "react";
import { text, json } from "d3";
import Phylotree from "react-phylotree";
import { phylotree } from "phylotree";

function fetcher(url) {
  const extension = url.split(".")[1];
  if (extension == "json") return json(url);
  return text(url);
}

class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    const { source, modifier, child_prop } = this.props;
    let sources, modifiers, child_props;
    if (typeof source == "string") {
      sources = [source];
    } else {
      sources = source;
    }
    if (typeof modifier == "function") {
      modifiers = Array(sources.length).fill(modifier);
    } else {
      modifiers = modifier;
    }
    if (typeof child_prop == "string") {
      child_props = [child_prop];
    } else {
      child_props = child_prop;
    }
    Promise.all(sources.map(fetcher)).then(values => {
      const data = {};
      values.forEach((value, i) => {
        data[child_props[i]] = modifiers[i](value);
      });
      this.setState({ data });
    });
  }
  render() {
    if (!this.state.data) {
      return null;
    }
    return React.cloneElement(this.props.children, this.state.data);
  }
}

DataFetcher.defaultProps = {
  modifier: data => data,
  child_prop: "data"
};

const dimensions = {
  width: 500,
  height: 500
};

function BaseSVGTreeInstance(props) {
  const instantiate_phylotree = newick => new phylotree(newick);
  return (
    <svg {...dimensions}>
      <DataFetcher
        source="data/CD2.new"
        modifier={instantiate_phylotree}
        child_prop="tree"
      >
        <Phylotree {...dimensions} />
      </DataFetcher>
    </svg>
  );
}

function FileUploadButton(props) {
  const button_style = {
    position: "relative",
    overflow: "hidden"
  };
  const input_style = {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: "100%",
    minHeight: "100%",
    fontSize: "100px",
    textAlign: "right",
    filter: "alpha(opacity=0)",
    opacity: 0,
    outline: "none",
    background: "white",
    cursor: "inherit",
    display: "block"
  };
  return (
    <button type="button" className="btn btn-primary" style={button_style}>
      <input type="file" style={input_style} onChange={props.onChange} />
      {props.label}
    </button>
  );
}

export { DataFetcher, FileUploadButton, BaseSVGTreeInstance };
