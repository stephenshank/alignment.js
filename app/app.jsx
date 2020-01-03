import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { FASTAViewer, FNAViewer } from "alignment.js";
import "bootstrap";

import Home from "./home.jsx";
import AminoAcid from "./FASTA/amino_acid.jsx";
import Highlight from "./FASTA/highlight.jsx";
import StartAtSiteAndSequence from "./FASTA/start_at_site_and_sequence.jsx";
import Lowercase from "./FASTA/lowercase.jsx";
import SVGAlignmentExample from "./FASTA/svg_example.jsx";
import SequenceBarChart from "./FASTA/sequence_bar_chart.jsx";
import { ReadGraphExample } from "./FASTA/read_graph.jsx";

import "./styles.scss";

function Divider(props) {
  return [
    <div className="dropdown-divider" key="divider-div" />,
    props.header ? (
      <h6 className="dropdown-header" key="divider-header">
        {props.header}
      </h6>
    ) : null
  ];
}

function Link(props) {
  return (
    <NavLink className="dropdown-item link" to={props.to}>
      {props.header}
    </NavLink>
  );
}

function Dropdown(props) {
  return (
    <ul className="navbar-nav ">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {props.title}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {props.children}
        </div>
      </li>
    </ul>
  );
}

function FASTALinks(props) {
  return (
    <Dropdown title={"FASTA"}>
      <Link to="/fasta-viewer" header="Viewer" />
      <Divider header="Examples" />
      <Link to="/fasta-aminoacid" header="Amino acid alignment" />
      <Link to="/fasta-highlight" header="Highlight individual sites" />
      <Link to="/fasta-start" header="Start at a given sequence and site" />
      <Link to="/fasta-lowercase" header="Lower case alignment" />
      <Link to="/fasta-svg" header="SVG alignment" />
      <Divider header="Graphs" />
      <Link to="/fasta-seq-bar" header="Sequence bar chart" />
      <Link to="/fasta-read-graph" header="Read graph" />
    </Dropdown>
  );
}

function FNALinks(props) {
  return (
    <Dropdown title={"FNA"}>
      <Link to="/fna-viewer" header="Viewer" />
      <Divider header="Examples" />
      <Link to="/fna-immunology" header="Immunology - heavy chain regions" />
      <Link to="/fna-hiv" header="HIV - site annotations" />
      <Link to="/fna-basesvgtree" header="BaseSVGTreeInstance" />
    </Dropdown>
  );
}

function BAMLinks(props) {
  return (
    <Dropdown title={"BAM"}>
      <Link to="/sam-viewer" header="Viewer" />
      <Divider header="Examples" />
      <Link to="/sam-variantcaller" header="Variant caller" />
      <Link to="/sam-scaffold" header="Scaffold viewer" />
    </Dropdown>
  );
}

function NavBar(props) {
  const show_import_export = props.viewing == "alignment";
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          Javascript Alignment Viewer
        </NavLink>
        <div className="collapse navbar-collapse">
          <FASTALinks />
        </div>
      </nav>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={{ maxWidth: 1140 }} className="container-fluid">
          <Route exact path="/" render={props => <Home />} />
          <Route exact path="/fasta-viewer" render={props => <FASTAViewer />} />
          <Route path="/fasta-aminoacid" component={AminoAcid} />
          <Route path="/fasta-highlight" component={Highlight} />
          <Route path="/fasta-start" component={StartAtSiteAndSequence} />
          <Route path="/fasta-lowercase" component={Lowercase} />
          <Route path="/fasta-svg" component={SVGAlignmentExample} />
          <Route path="/fasta-seq-bar" component={SequenceBarChart} />
          <Route path="/fasta-read-graph" component={ReadGraphExample} />
        </div>
      </div>
    );
  }
}

function Main(props) {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Main />,
  document.body.appendChild(document.createElement("div"))
);
