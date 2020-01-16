import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { text } from "d3-fetch";
import { saveAs } from "file-saver";
import { saveSvgAsPng as savePNG } from "save-svg-as-png";
import d3_save_svg from "d3-save-svg";
import * as d3 from "d3";
import Alignment, { SVGAlignment } from "alignment.js";
import {
  nucleotide_color,
  nucleotide_difference
} from "alignment.js/lib/helpers/colors";
import Modal from "react-bootstrap/Modal";
import fastaParser, { fastaToText } from "alignment.js/lib/helpers/fasta";
import { FileUploadButton } from "./Components.jsx";

class FASTAViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      siteSize: 20,
      show_differences: "",
      showModal: false,
      view: "canvas"
    };
    this.handleFileChange = this.handleFileChange.bind(this);
  }
  componentDidMount() {
    text("data/CD2.fasta").then(data => this.loadFASTA(data));
  }
  loadFASTA(fasta) {
    this.setState({
      data: fastaParser(fasta),
      show_differences: ""
    });
  }
  saveFASTA() {
    const blob = new Blob([fastaToText(this.state.data)], {
      type: "text/plain:charset=utf-8;"
    });
    saveAs(blob, "sequences.fasta");
  }
  siteColor() {
    if (!this.state.show_differences) return nucleotide_color;
    const desired_record = this.state.data.filter(
      datum => datum.header == this.state.show_differences
    )[0];
    return nucleotide_difference(desired_record);
  }
  molecule() {
    if (!this.state.show_differences) return molecule => molecule;
    const desired_record = this.state.data.filter(
      datum => datum.header == this.state.show_differences
    )[0];
    return (mol, site, header) => {
      if (mol == "-") return "-";
      if (header == desired_record.header) return mol;
      return mol == desired_record.seq[site - 1] ? "." : mol;
    };
  }
  handleFileChange(e) {
    const files = e.target.files;
    if (files.length == 1) {
      const file = files[0],
        reader = new FileReader();
      reader.onload = e => {
        this.loadFASTA(e.target.result);
      };
      reader.readAsText(file);
    }
  }
  savePNG() {
    this.setState({ view: "svg" }, () => {
      savePNG(document.getElementById("alignmentjs-svg"), "alignment.png");
      this.setState({ view: "canvas" });
    });
  }
  saveSVG() {
    this.setState({ view: "svg" }, () => {
      d3_save_svg.save(d3.select("#alignmentjs-svg").node(), {
        filename: "alignment"
      });
      this.setState({ view: "canvas" });
    });
  }
  render() {
    const toolbar_style = {
      display: "flex",
      justifyContent: "space-between",
      width: 960
    };
    const options = this.state.data
      ? this.state.data.map(datum => {
          return (
            <option key={datum.header} value={datum.header}>
              {datum.header}
            </option>
          );
        })
      : null;
    return (
      <div>
        <h1>FASTA Viewer Application</h1>
        <div style={toolbar_style}>
          <ButtonGroup>
            <FileUploadButton label="Import" onChange={this.handleFileChange} />
            <Button onClick={() => this.setState({ showModal: true })}>
              Export
            </Button>
            <Button onClick={() => this.savePNG()}>Save PNG</Button>
            <Button onClick={() => this.saveSVG()}>Save SVG</Button>
          </ButtonGroup>
          <span>
            <label>Site size:</label>
            <input
              type="number"
              value={this.state.siteSize}
              min={15}
              max={100}
              step={5}
              onChange={e => this.setState({ siteSize: +e.target.value })}
            />
          </span>
          <span>
            <label>View:</label>
            <select
              value={this.state.view}
              onChange={e => this.setState({ view: e.target.value })}
            >
              <option value="canvas">Canvas</option>
              <option value="svg">SVG</option>
            </select>
          </span>
          <span>
            <label>Highlight difference from:</label>
            <select
              style={{ width: 100 }}
              value={this.state.show_differences}
              onChange={e =>
                this.setState({ show_differences: e.target.value })
              }
            >
              <option value={""}>None</option>
              {options}
            </select>
          </span>
        </div>
        <div>
          <Alignment
            fasta={this.state.data}
            siteSize={this.state.siteSize}
            molecule={this.molecule()}
            siteColor={this.siteColor()}
            svg={this.state.view == "svg"}
          />
        </div>
        <Modal
          onHide={() => this.setState({ showModal: false })}
          show={this.state.showModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>FASTA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={() => this.saveFASTA()}>Download</Button>
            <div style={{ overflowY: "scroll", width: 400, height: 400 }}>
              <p>{this.state.data ? fastaToText(this.state.data) : null}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FASTAViewer;
