import React, { useEffect } from "react";
import {
  nucleotide_color,
  nucleotide_text_color,
  amino_acid_color,
  amino_acid_text_color
} from "./../helpers/colors";

const _ = require("underscore");

function BaseAlignment(props) {
  const canvas_id = props.id + "-alignment",
    div_id = props.id + "-alignment-div";
  function draw(x_pixel, y_pixel) {
    if (!props.sequenceData) return;
    if (props.disableVerticalScrolling) y_pixel = 0;
    const { width, height, siteSize, molecule } = props,
      start_site = Math.floor(x_pixel / siteSize),
      end_site = Math.ceil((x_pixel + width) / siteSize),
      start_seq = Math.floor(y_pixel / siteSize),
      end_seq = Math.ceil((y_pixel + height) / siteSize),
      site_color = props.amino_acid ? amino_acid_color : props.siteColor,
      text_color = props.amino_acid ? amino_acid_text_color : props.textColor;
    const individual_sites = _.flatten(
      props.sequenceData
        .filter((row, i) => {
          const after_start = i >= start_seq;
          const before_finish = i <= end_seq;
          return after_start && before_finish;
        })
        .map((row, i) => {
          return row.seq
            .slice(start_site, end_site)
            .split("")
            .map((mol, j) => {
              return {
                mol: mol,
                j: start_site + j + 1,
                i: start_seq + i + 1,
                header: row.header
              };
            });
        })
    );
    const context = document.getElementById(canvas_id).getContext("2d");
    context.font = "14px Courier";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.setTransform(1, 0, 0, 1, -x_pixel, -y_pixel);
    individual_sites.forEach(function(d) {
      const x = siteSize * (d.j - 1),
        y = siteSize * (d.i - 1),
        mol = molecule(d.mol, d.j, d.header);
      context.beginPath();
      context.fillStyle = site_color(d.mol, d.j, d.header);
      context.rect(x, y, siteSize, siteSize);
      context.fill();
      context.fillStyle = text_color(d.mol, d.j, d.header);
      context.fillText(mol, x + siteSize / 2, y + siteSize / 2);
      context.closePath();
    });
  }

  useEffect(() => {
    document
      .getElementById(canvas_id)
      .addEventListener("alignmentjs_wheel_event", e => {
        draw(e.detail.x_pixel, e.detail.y_pixel);
      });
  });
  return (
    <div
      id={div_id}
      onWheel={e => {
        e.preventDefault();
        props.scrollBroadcaster.handleWheel(e, props.sender);
      }}
    >
      <canvas width={props.width} height={props.height} id={canvas_id} />
    </div>
  );
}

BaseAlignment.defaultProps = {
  siteColor: nucleotide_color,
  textColor: nucleotide_text_color,
  molecule: mol => mol,
  siteSize: 20,
  id: "alignmentjs",
  sender: "main",
  width: 500,
  height: 200
};

export default BaseAlignment;
