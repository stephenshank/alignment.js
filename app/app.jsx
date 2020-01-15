import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Home from "./home.jsx";
import FASTAViewer from "./FASTAViewer.jsx";
import AminoAcid from "./FASTA/amino_acid.jsx";
import Highlight from "./FASTA/highlight.jsx";
import StartAtSiteAndSequence from "./FASTA/start_at_site_and_sequence.jsx";
import Lowercase from "./FASTA/lowercase.jsx";
import SVGAlignmentExample from "./FASTA/svg_example.jsx";
import SequenceBarChart from "./FASTA/sequence_bar_chart.jsx";
import { ReadGraphExample } from "./FASTA/read_graph.jsx";

import "./styles.scss";

function FASTALinks(props) {
  return (
    <NavDropdown title="FASTA">
      <NavDropdown.Item as={Link} to="/fasta-viewer">
        Viewer
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/fasta-aminoacid">
        Amino acid alignment
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/fasta-highlight">
        Highlight individual sites
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/fasta-start">
        Start at a given sequence and site
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/fasta-lowercase">
        Lower case alignment
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/fasta-svg">
        SVG alignment
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/fasta-seq-bar">
        Sequence bar chart
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/fasta-read-graph">
        Read graph
      </NavDropdown.Item>
    </NavDropdown>
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

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">
            alignment.js
          </Navbar.Brand>
          <Nav className="mr-auto">
            <FASTALinks />
          </Nav>
        </Navbar>
        <div style={{ maxWidth: 1140 }} className="container-fluid">
          <Switch>
            <Route path="/fasta-viewer">
              <FASTAViewer />
            </Route>
            <Route path="/fasta-aminoacid">
              <AminoAcid />
            </Route>
            <Route path="/fasta-highlight">
              <Highlight />
            </Route>
            <Route path="/fasta-start">
              <StartAtSiteAndSequence />
            </Route>
            <Route path="/fasta-lowercase">
              <Lowercase />
            </Route>
            <Route path="/fasta-svg">
              <SVGAlignmentExample />
            </Route>
            <Route path="/fasta-seq-bar">
              <SequenceBarChart />
            </Route>
            <Route path="/fasta-read-graph">
              <ReadGraphExample />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement("div"))
);
