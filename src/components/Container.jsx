import React, { useState, useEffect } from "react";
import _ from "underscore";

import fastaParser from "./../helpers/fasta";
import computeLabelWidth from "./../helpers/computeLabelWidth";
import ScrollBroadcaster from "./../helpers/ScrollBroadcaster";
import css_grid_format from "./../helpers/format";

function guessShape(number_of_components) {
  if (number_of_components == 4) return [2, 2];
  if (number_of_components == 6) return [2, 3];
  throw new Error(
    "Specify desired shape to Container component with shape prop."
  );
}

function sum(array) {
  return array.reduce((a, x) => a + x, 0);
}

function cumulative_sum(array) {
  return array.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
}

function get_translations(array) {
  return [0, ...cumulative_sum(array).slice(0, array.length - 1)];
}

function Container(props) {
  const [containerSpecs, setContainerSpecs] = useState({
    columnWidths: [],
    rowHeights: []
  });
  const {
    rowHeights,
    columnWidths,
    scrollBroadcaster,
    sequenceData,
    nCols
  } = containerSpecs;
  useEffect(
    () => {
      if (!props.fasta) return;
      var rowHeights, columnWidths;
      const { width, height, siteSize, labelPadding } = props,
        sequenceData = fastaParser(props.fasta),
        [nRows, nCols] = guessShape(props.children.length),
        full_pixel_width = sequenceData[0].seq.length * siteSize,
        full_pixel_height = sequenceData.length * siteSize;
      if (props.rowHeights) rowHeights = props.rowHeights;
      else {
        const first_row_height =
          props.children
            .slice(0, nCols)
            .map(child => child.type.name)
            .indexOf("AxisTop") >= 0
            ? props.plotAxisHeight
            : props.siteAxisHeight;
        const second_row_height = Math.min(
          full_pixel_height,
          props.height - first_row_height
        );
        rowHeights = [first_row_height, second_row_height];
      }
      const non_alignment_height = rowHeights[0];

      var alignment_index = props.children
        .slice(nCols)
        .map(child => child.type.name)
        .reduce((a, v, i) => (v == "BaseAlignment" ? i : a), -1);
      var non_alignment_width = 0;
      if (props.columnWidths) {
        non_alignment_width = columnWidths.reduce(
          (a, v, i) => (i == alignment_index ? a : a + v),
          0
        );
        columnWidths = props.columnWidths;
      } else {
        columnWidths = props.children.slice(nCols).map((child, i) => {
          if (child.type.name == "SequenceAxis") {
            const column_width = computeLabelWidth(sequenceData, labelPadding);
            non_alignment_width += column_width;
            return column_width;
          } else if (child.type.name == "BaseAlignment") {
            alignment_index = i;
            return 0;
          } else {
            return props.defaultComponentSize;
          }
        });
        columnWidths[alignment_index] = Math.min(
          full_pixel_width,
          width - non_alignment_width
        );
      }

      const component_to_div_id = {
        BaseAlignment: "alignmentjs-alignment",
        BaseTree: "alignmentjs-tree-div",
        SequenceAxis: "alignmentjs-labels-div",
        SiteAxis: "alignmentjs-axis-div"
      };
      const scroll_broadcaster = new ScrollBroadcaster({
        width: full_pixel_width,
        height: full_pixel_height,
        x_pad: width - non_alignment_width,
        y_pad: height - non_alignment_height,
        x_fraction: scrollBroadcaster
          ? scrollBroadcaster["main"].x_fraction
          : 0,
        y_fraction: scrollBroadcaster
          ? scrollBroadcaster["main"].y_fraction
          : 0,
        site_size: siteSize,
        bidirectional: props.children
          .map(child => component_to_div_id[child.type.name])
          .filter(x => x)
      });
      setContainerSpecs({
        scrollBroadcaster: scroll_broadcaster,
        sequenceData: sequenceData,
        rowHeights: rowHeights,
        columnWidths: columnWidths,
        nCols: nCols
      });
    },
    [props.fasta, props.siteSize]
  );
  useEffect(() => {
    if (!scrollBroadcaster || svg) return;
    scrollBroadcaster.broadcast(null, null, "main");
  });
  const svg = props.svg ? scrollBroadcaster.siteAndHeaderIndices() : false;
  if (!svg) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: css_grid_format(columnWidths),
          gridTemplateRows: css_grid_format(rowHeights)
        }}
      >
        {props.children.map((child, index) => {
          const row = Math.floor(index / nCols),
            column = index % nCols;
          return React.cloneElement(child, {
            key: index,
            width: columnWidths[column],
            height: rowHeights[row],
            scrollBroadcaster: scrollBroadcaster,
            sequenceData: sequenceData,
            siteSize: props.siteSize,
            svg: svg
          });
        })}
      </div>
    );
  }
  const trimmedSequenceData = sequenceData
      .slice(svg.sequences[0], svg.sequences[1])
      .map(record => ({
        header: record.header,
        seq: record.seq.slice(svg.sites[0], svg.sites[1])
      })),
    translateXs = get_translations(columnWidths),
    translateYs = get_translations(rowHeights),
    height = sum(rowHeights),
    width = sum(columnWidths);
  trimmedSequenceData.number_of_sites = trimmedSequenceData[0].seq.length;
  return (
    <svg id="alignmentjs-svg" width={width} height={height}>
      <rect x="0" y="0" width={width} height={height} fill="white" />
      {props.children.map((child, index) => {
        const row = Math.floor(index / nCols),
          column = index % nCols;
        return React.cloneElement(child, {
          key: index,
          width: columnWidths[column],
          height: rowHeights[row],
          scrollBroadcaster: scrollBroadcaster,
          sequenceData: trimmedSequenceData,
          siteSize: props.siteSize,
          translateX: translateXs[column],
          translateY: translateYs[row],
          svg: svg
        });
      })}
    </svg>
  );
}

Container.defaultProps = {
  svg: false,
  shape: null,
  xPixel: 0,
  yPixel: 0,
  width: 900,
  height: 500,
  siteSize: 20,
  rowHeights: null,
  columnWidths: null,
  plotAxisHeight: 50,
  siteAxisHeight: 25,
  labelPadding: 5,
  defaultComponentSize: 300,
  centerOnHeader: false,
  centerOnSite: false
};

export default Container;
