import React from "react";

import "./BlockHeader.css";

export default function BlockHeader({ titleName }) {
  return (
    <section className="block-header">
      <h2 className="block-title">{titleName}</h2>
    </section>
  );
}
