import React from "react";

import Container from "./components/Container.jsx";
import BaseAlignment from "./components/BaseAlignment.jsx";
import SiteAxis from "./components/SiteAxis.jsx";
import Placeholder from "./components/Placeholder.jsx";
import SequenceAxis from "./components/SequenceAxis.jsx";
import { nucleotide_color, nucleotide_text_color } from "./helpers/colors";

function Alignment(props) {
  return (
    <Container fasta={props.fasta} siteSize={props.siteSize} svg={props.svg}>
      <Placeholder />
      <SiteAxis />
      <SequenceAxis onClick={props.onSequenceClick} />
      <BaseAlignment
        siteColor={props.siteColor}
        textColor={props.textColor}
        molecule={props.molecule}
        aminoAcid={props.aminoAcid}
      />
    </Container>
  );
}

Alignment.defaultProps = {
  siteColor: nucleotide_color,
  textColor: nucleotide_text_color,
  molecule: mol => mol,
  onSequenceClick: (label, i) => () => null,
  siteSize: 20,
  aminoAcid: false,
  svg: false
};

export default Alignment;
