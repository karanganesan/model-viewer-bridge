import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";

const View = () => {
  const params = useParams();
  const modelRef = useRef(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    document.title = "model-viewer: View Page";
    const { id } = params;

    (async () => {
      try {
        let response = await fetch("https://ppng.io/" + id);
        const blob = await response.blob();
        if (typeof blob === "object" && blob.type === "model/gltf+json") {
          console.log("hey");
          setSrc(URL.createObjectURL(blob));
        }
      } catch (error) {
        // bad request
        console.error(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
