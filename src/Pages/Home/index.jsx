import React from "react";
import "./index.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Model Viewer Bridge</h1>
      <p className="sub-title">
        An easy to use bridge between your 3D models on desktop <br /> and 3D
        viewer in your mobile + View in AR
      </p>

      <img
        className="image"
        src="/assets/undraw_progressive_app_m9ms.svg"
        alt="computer to mobile bridge"
      ></img>

      <p className="features">
        <ul>
          <li>No account, no installation</li>
          <li>Models never saved on any servers</li>
          <li>
            View in Augmented Reality using WebXR-compatible browser / Android
            Scene Viewer
          </li>
          <li>Supports gltf binary format 3d model</li>
        </ul>
      </p>

      <a className="drop" href="/drop">
        <p>Start</p>
      </a>
    </div>
  );
};

export default Home;
