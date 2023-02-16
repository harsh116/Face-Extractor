import React, { useState, useEffect } from "react";
import "./ImageLinkForm.css";

import { HOST } from "../../constants";

// const calculateFaceLocation = (data, props) => {
//   let faceArray = data.outputs[0].data.regions;
//   //[0].region_info.bounding_box;
//   let image = document.querySelector("#imageFaceId");
//   let width = Number(image.width);
//   let height = Number(image.height);

//   console.log("faceArray: ", faceArray);

//   let newFaceArray = faceArray.map((face, i) => {
//     face = face.region_info.bounding_box;

//     let leftCol = face.left_col * width;
//     let rightCol = width - face.right_col * width;
//     let topRow = face.top_row * height;
//     let bottomRow = height - face.bottom_row * height;

//     return { leftCol, rightCol, topRow, bottomRow };
//   });

//   // console.log("newFaceArray: ", newFaceArray);
//   props.setBox(newFaceArray);
// };

const calculateFaceLocation = (data, props) => {
  let faceArray = data.outputs[0].data.regions;
  //[0].region_info.bounding_box;
  let image = document.querySelector("#imageFaceId");
  let width = Number(image.width);
  let height = Number(image.height);

  if (!faceArray) {
    props.alertMessage("Faces not detected");
    props.setGenerateFacesButtonActive(false);
    return;
  }

  console.log("faceArray: ", faceArray);

  let newFaceArray = faceArray.map((face, i) => {
    face = face.region_info.bounding_box;

    let leftCol = face.left_col * 100;
    let rightCol = (1 - face.right_col) * 100;
    let topRow = face.top_row * 100;
    let bottomRow = (1 - face.bottom_row) * 100;

    leftCol = leftCol.toString() + "%";
    rightCol = rightCol.toString() + "%";
    topRow = topRow.toString() + "%";
    bottomRow = bottomRow.toString() + "%";

    props.setGenerateFacesButtonActive(true);

    return { leftCol, rightCol, topRow, bottomRow };
  });

  // console.log("newFaceArray: ", newFaceArray);

  props.setBox(newFaceArray);
};

const isValidURL = (url) => {
  url = url.trimStart();
  if (url.length >= 4 && url.substr(0, 4) === "http") return true;
  else return false;
};

const ImageLinkForm = function (props) {
  useEffect(() => {
    // effect

    props.setGenerateFacesButtonActive(false);
    props.setFaceDetectionPendingStatus(false);
  }, [props.input]);

  if (props.submitStatus === true && isValidURL(props.input)) {
    props.setFaceDetectionPendingStatus(true);
    fetch(`${HOST}/ClarifaiApi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: props.input,
        email: props.userData.email,
      }),
      //   body: "dfvfd",
    })
      .then((res) => res.json())

      .then((response) => {
        props.setFaceDetectionPendingStatus(false);
        if (response.message !== "success") {
          console.log("response: ", response);
          props.alertMessage(response.message);
          return;
        }

        calculateFaceLocation(response.data, props);

        fetch(`${HOST}/image`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(props.userData),
        })
          .then((response) => response.json())
          .then((data) => props.onUserData(data));
      })
      // .then(data=>console.log(data))
      .catch((error) => {
        props.setFaceDetectionPendingStatus(false);
        console.log("error: ", error);
      });
    setTimeout(() => {
      console.log("check");
    }, 100);
    props.setSubmitFalse();
  } else if (props.submitStatus === true) {
    props.setFaceDetectionPendingStatus(true);
    fetch(`${HOST}/detectLocalImage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: props.input,
        email: props.userData.email,
      }),
      //   body: "dfvfd",
    })
      .then((res) => res.json())

      .then((response) => {
        props.setFaceDetectionPendingStatus(false);
        if (response.message !== "success") {
          console.log("response: ", response);
          props.alertMessage(response.message);
          return;
        }

        calculateFaceLocation(response.data, props);
        // props.setGenerateFacesButtonActive(true);

        fetch(`${HOST}/image`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(props.userData),
        })
          .then((response) => response.json())
          .then((data) => props.onUserData(data));
      })
      .catch((err) => {
        props.setFaceDetectionPendingStatus(false);
        console.log(err);
      });
    // .then(data=>console.log(data))
    // .catch((error) => console.log("error: ", error));
    setTimeout(() => {
      console.log("check");
    }, 100);
    props.setSubmitFalse();
  }

  // console.log("input: ", props.input);
  console.log("submit", props.submitStatus);
  return (
    <div className="">
      <p className="f3">
        {`This Magic Brain will detect faces in your pictures. Give it a try.`}
      </p>
      <div className="flexCenter">
        <div className="flexCenter form pa4 br3 shadow-5">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={props.onInputChange}
            id="imageInput"
            placeholder="Paste image URL here"
          />
          <button
            className="w-30 ph3 pv2 f4 grow link dib white bg-light-purple pointer"
            onClick={props.onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
