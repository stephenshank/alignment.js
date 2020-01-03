import React, { Component } from "react";
import Phylotree from "react-phylotree";

import { vertical_scroll } from "../helpers/scroll_events";

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      div_id: props.id + "-tree-div"
    };
  }
  componentDidMount() {}
  handleWheel(e) {
    e.preventDefault();
    this.props.scroll_broadcaster.handleWheel(e, this.props.sender);
  }
  render() {
    const { width, height, tree, site_size } = this.props;
    if (!tree) {
      return <div id={this.state.div_id} className="alignmentjs-container" />;
    }
    const number_of_tips = tree.get_tips().length,
      tree_height = number_of_tips * site_size,
      overflow = "scroll hidden";
    return (
      <div
        id={this.state.div_id}
        style={{ width, height, overflow }}
        className="alignmentjs-container"
      >
        <svg
          width={width}
          height={tree_height}
          className="alignmentjs-container"
        >
          <Phylotree tree={tree} width={width} height={tree_height} />
        </svg>
      </div>
    );
  }
}

Tree.defaultProps = {
  id: "alignmentjs",
  site_size: 20,
  sender: "main"
};

export default Tree;
