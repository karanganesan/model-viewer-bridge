import React from "react";
import "./index.css";

const Loading = ({ visible }) => {
  return (
    <div
      className="lds-ellipsis"
      style={{
        display: visible ? "inline-block" : "none",
      }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
