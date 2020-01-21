import React, { Component } from "react";
import { text } from "d3";

import Alignment, { fastaParser, colors } from "alignment.js";

class AminoAcid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence_data: null
    };
  }
  componentDidMount() {
    text("data/CD2_AA.fasta").then(data => {
      const sequence_data = fastaParser(data);
      this.setState({ sequence_data });
    });
  }
  render() {
    return (
      <div>
        <div>
          <h1>Amino Acid Alignment</h1>
        </div>
        <Alignment fasta={this.state.sequence_data} aminoAcid />
      </div>
    );
  }
}

export default AminoAcid;
