const fs = require("fs");
import React from "react";
import renderer from "react-test-renderer";

import { VanillaBaseSVGAlignment } from "../lib/snapshots";

test("BaseSVGAlignment renders correctly with vanilla options", () => {
  const fasta = fs.readFileSync("./dist/data/Simple.fasta"),
    vanilla_base_svg_alignment = renderer
      .create(<VanillaBaseSVGAlignment />)
      .toJSON();
  expect(vanilla_base_svg_alignment).toMatchSnapshot();
});
