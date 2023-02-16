import "./ImageUploadBox.scss";
import { useState, useEffect } from "react";
import { HOST } from "../../constants";
import axios from "axios";

const TEN_MB = 10485760;

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function ImageUploadBox(props) {
  const [selectedFileName, setSelectedFileName] = useState("");
  const { setSpinnerVisible } = props;

  const pendingWork = (isPending, src = "") => {
    const img = document.querySelector("#imageFaceId");
    img.src = src;
    if (isPending) {
      setSpinnerVisible(true);
    } else {
      setSpinnerVisible(false);
    }
  };

  useEffect(() => {
    console.log("selected filename: ", selectedFileName);
  }, [selectedFileName]);

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [isbuttonHovered, setButtonHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { setInputChangeDirect } = props;

  const handleButtonEntered = () => {
    // console.log("mouse entered");
    // const body = document.querySelector("body");
    // body.style.cursor = "pointer";
    setButtonHovered(true);
  };

  const handleButtonLeft = () => {
    // console.log("mouse left");
    // const body = document.querySelector("body");
    // body.style.cursor = "default";
    setButtonHovered(false);
  };

  const handleFileChange = (e) => {
    // onInputChange(e);
    // const imageInput = document.querySelector("#imageInput");
    // imageInput.value = e.target.value;
    // console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setSelectedFileName(e.target.files[0]?.name || "");
  };

  const fileUpload = () => {
    // const fileUpload = document.querySelector("#fileUpload");

    setSelectedFileName("");

    if (selectedFile?.size > TEN_MB) {
      props.alertMessage("Image size must be under 10 mb");
      return;
    }

    const formData = new FormData();

    formData.append("myFile", selectedFile);

    console.log("selected File: ", selectedFile);

    if (selectedFile === null) {
      alert("Select the image to upload");
      return;
    }

    pendingWork(true);
    axios
      .post(`${HOST}/uploadLocalFile`, formData, {})
      .then((res) => {
        pendingWork(false, props.input);
        console.log(res.statusText);
        // console.log("res upload: ", res);

        if (res.data.message === "success") {
          // props.alertMessage("Image uploaded successfully");
          setInputChangeDirect(res.data.src);
        }
      })
      .catch((err) => {
        setSpinnerVisible(false);
        console.log(err);
      });
  };

  return (
    <div className="ImageUploadBox_Main" data-fileName={selectedFileName}>
      {/* <form
        action={`${HOST}/uploadLocalFile`}
        method="POST"
        encType="multitype/form-data"
      > */}
      <div className="ImageUploadBox">
        <button class={`btn ${isbuttonHovered ? "hovered" : ""} `}>
          <i className="fas fa-paperclip mr-m"></i>Upload a image
        </button>
        <input
          id="fileUpload"
          className="fileUploadInput"
          accept="image/*"
          type="file"
          onMouseEnter={handleButtonEntered}
          onMouseLeave={handleButtonLeft}
          onChange={handleFileChange}
        />
      </div>

      <button className="imageUploadSubmitBox_btn" onClick={fileUpload}>
        <i className="fas fa-paper-plane"></i>
      </button>
      {/* <input type="submit" value="Submit" /> */}
    </div>
  );
}

export default ImageUploadBox;
