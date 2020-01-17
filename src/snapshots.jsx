import React from "react";

import fastaParser from "./helpers/fasta";
import { BaseSVGAlignment } from "./components/BaseAlignment";

const fasta = `
>Seq1
ATCGTAATTGCA
>Seq2
CTCGTAATGGCC
>Seq3
GTCGTCAATGCT
`,
  parsed_fasta = fastaParser(fasta);

function VanillaBaseSVGAlignment() {
  return (
    <svg>
      <BaseSVGAlignment sequenceData={parsed_fasta} />
    </svg>
  );
}

function AllSnapshots() {
  return (
    <div>
      <h4>VanillaBaseSVGAlignment</h4>
      <VanillaBaseSVGAlignment />
    </div>
  );
}

export default AllSnapshots;
export { VanillaBaseSVGAlignment };
