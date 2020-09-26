import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";

const View = () => {
  const params = useParams();
  const modelRef = useRef(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const { id } = params;
    (() => {
      setInterval(async () => {
        try {
          const response = await fetch("https://ppng.io/" + id);
          const blob = await response.blob();
          setSrc(URL.createObjectURL(blob));
        } catch (error) {
          // bad request
          console.error(error);
        }
      }, 5000);
    })();
    document.title = "model-viewer: View Page";
  }, [params]);
  return (
    <div className="view">
      {typeof src === "string" && (
        <model-viewer
          ref={modelRef}
          src={src}
          alt="A 3D model"
          camera-controls
          interaction-prompt="none"
          ar
        ></model-viewer>
      )}
      {src === null && (
        <h1 className="waiting-message">Waiting to receive model...</h1>
      )}
      <h1 className="title">View Page</h1>
      <h1 className="sub-title">
        go to{" "}
        <a href="/drop" target="_blank" rel="noopener noreferrer">
          drop
        </a>{" "}
        page
        <br /> to send a model
      </h1>
    </div>
  );
};

export default View;
