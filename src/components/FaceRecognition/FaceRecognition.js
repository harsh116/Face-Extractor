import React, { useState, useEffect } from "react";
import "./FaceRecognition.css";
import Spinner from "../Spinner/Spinner";
import { Fragment } from "react";

const Box = (props) => {
  return (
    <div
      className="bounding-box"
      style={{
        top: props.box.topRow,
        left: props.box.leftCol,
        right: props.box.rightCol,
        bottom: props.box.bottomRow,
      }}
    ></div>
  );
};

const FaceRecognition = (props) => {
  const BoxArray = props.boxArray.map((box) => {
    return <Box box={box} />;
  });

  const [isImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // effect

    const imageFaceId = document.querySelector("#imageFaceId");
    imageFaceId.addEventListener("load", () => {
      setImageLoaded(true);
      // const detectionSpinner = document.querySelector(".detectionSpinner");
      // detectionSpinner.style.margin = "auto";
      // imageFaceId.style.margin = "auto";
    });
  }, [props.input]);

  return (
    <div className="flexCenter ma">
      <div className="absolute mt2 imageBox">
        <img
          id="imageFaceId"
          src={props.input}
          alt=""
          // max-width="100%
          height="auto"
        />
        {BoxArray}
        <div
          className={`spinnerOverlay ${
            isImageLoaded && props.faceDetectionPendingStatus ? "" : "none"
          }`}
        >
          <Spinner
            text="Detecting faces"
            type="TailSpin"
            visible={isImageLoaded && props.faceDetectionPendingStatus}
            classes="detectionSpinner"
          />
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
