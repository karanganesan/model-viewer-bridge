import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { meaningful } from "meaningful-string";
import QRCode from "qrcode-react";
import Loading from "../../Components/Loading";

const Drop = () => {
  const modelRef = useRef(null);
  const inputRef = useRef(null);
  const detailsRef = useRef(null);

  const [pipingServerId, setPipingServerId] = useState("");
  const [loadingVisibility, setLoadingVisibility] = useState(false);

  useEffect(() => {
    const options = {
      numberUpto: 60,
      joinBy: "-",
    };
    const id = meaningful(options);
    setPipingServerId(id.toLowerCase());
    document.title = "Drop Page";
  }, []);

  const sendBlob = async (blob) => {
    if (blob.name.includes(".glb")) {
      modelRef.current.src = URL.createObjectURL(blob);
      setLoadingVisibility(true);
      await fetch("https://ppng.io/MVB-" + pipingServerId, {
        method: "POST",
        body: blob,
      });
      setLoadingVisibility(false);
    } else {
      alert("no glb was found");
    }
  };

  const handleDropModel = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const blob = e.nativeEvent.dataTransfer.files[0];
    sendBlob(blob);
  };

  const handleInputModel = (event) => {
    const blob = event.target.files[0];
    sendBlob(blob);
  };

  const dismissDetails = () => {
    if (detailsRef.current.hasAttribute("open")) {
      detailsRef.current.removeAttribute("open");
    }
  };

  return (
    <div
      className="drop"
      onDrop={handleDropModel}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }}
      onClick={dismissDetails}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".glb"
        className="hidden-input"
        onChange={handleInputModel}
      />
      <model-viewer
        ref={modelRef}
        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        alt="A 3D model"
        camera-controls
        interaction-prompt="none"
      ></model-viewer>
      <h1 className="title">Drop Page</h1>
      <h1
        className="sub-title"
        onClick={() => {
          inputRef.current.click();
        }}
      >
        click here to select
        <br /> or simply drop a .glb
      </h1>
      <div className="qr-code">
        <QRCode
          value={window.location.origin.toString() + "/view/" + pipingServerId}
          size={125}
        />
        <a
          href={window.location.origin.toString() + "/view/" + pipingServerId}
          target="_blank"
          rel="noopener noreferrer"
          className="url"
        >
          <p>{pipingServerId}</p>
        </a>
      </div>
      <Loading visible={loadingVisibility}></Loading>

      <details className="help-details" ref={detailsRef}>
        <summary>Help</summary>
        <ol>
          <li>
            Scan the QR Code / open the view link <br /> on top right corner on
            your mobile
          </li>
          <li>Drop the glb file anywhere on the page</li>
          <li>Check your mobile page to view</li>
          <li>
            You can also use the same links to drop <br /> another model and
            view the same in mobile
          </li>
        </ol>
      </details>
    </div>
  );
};

export default Drop;
