import text_width from "text-width";

function computeLabelWidth(sequence_data, padding) {
  const label_width = sequence_data
    .map(record => text_width(record.header, { family: "Courier", size: 14 }))
    .reduce((a, b) => Math.max(a, b), 0);
  return 2 * padding + label_width;
}

export default computeLabelWidth;
