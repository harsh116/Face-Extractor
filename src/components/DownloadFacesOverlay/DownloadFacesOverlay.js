import { useState, useEffect, Fragment } from "react";

import "./DownloadFacesOverlay.scss";
// import { onButtonClick } from "./downloadMultipleFiles";
// import { trim } from "./trimCanvas";
import { CanvasMaker } from "./CanvasMaker";
import { onButtonClick } from "./downloadMultipleFiles";
import Spinner from "../Spinner/Spinner";
import { HOST } from "../../constants";

const isValidURL = (url) => {
  url = url.trimStart();
  if (url.length >= 4 && url.substr(0, 4) === "http") return true;
  else return false;
};

function DownloadFacesOverlay(props) {
  const [canvasArray, setCanvasArray] = useState([]);
  const [canvasUrls, setCanvasUrls] = useState([]);
  const [facesGeneratedStatus, setFacesGeneratedStatus] = useState(false);
  const [prevInput, setPrevInput] = useState("");

  const { setDownloadFaceBoxVisible, isDownloadFacesBoxVisible, boxArray } =
    props;

  const removePercentageSymbol = (perSymbol) => {
    perSymbol = Number(perSymbol.substr(0, perSymbol.length - 1));
    return perSymbol;
  };

  const percentageValueToPixelWidth = (per, img = null) => {
    // const img = document.getElementById("trimmedimg");
    per = (per * img.width) / 100;
    return per;
  };

  const percentageValueToPixelHeight = (per, img = null) => {
    // const img = document.getElementById("trimmedimg");
    per = (per * img.height) / 100;
    return per;
  };

  const changePercentageToPixels = (perString, dimension, image = null) => {
    const img = document.getElementById("imageFaceId");
    perString = removePercentageSymbol(perString);
    // const multiplier=dimension==='width'? :
    if (dimension === "width") {
      perString = percentageValueToPixelWidth(perString, image);
    } else {
      perString = percentageValueToPixelHeight(perString, image);
    }

    return perString;
  };

  // let canvasArray=''

  useEffect(async () => {
    if (boxArray.length === 0) {
      return;
    }
    // console.log("props input in effect: ", props.input);

    // if (isDownloadFacesBoxVisible === false) {
    //   // console.log("prev input: ", prevInput);

    //   // setPrevInput(props.input);
    //   return;
    // }
    setPrevInput(props.input);
    const img = document.querySelector("#imageFaceId");

    const image = new Image();

    let bytes = img.src;

    if (isValidURL(img.src)) {
      setFacesGeneratedStatus(true);
      let data = await fetch(`${HOST}/getImageBytes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: img.src }),
      });
      data = await data.json();

      if (data.message !== "success") {
        props.alertMessage(data.message);
        return;
      }

      bytes = data.imageBytes;
    }
    setFacesGeneratedStatus(false);

    console.log("image bytes: ", bytes);

    image.src = bytes;
    image.width = img.naturalWidth;
    image.height = img.naturalHeight;

    image.id = "trimmedimg";

    // render();
    // .onload = () => {

    let array = boxArray.map((box, i) => {
      const { leftCol, rightCol, topRow, bottomRow } = box;
      // debugger;
      let sx = box.leftCol;
      sx = changePercentageToPixels(sx, "width", image);
      // console.log("sx: ", sx);
      let sy = box.topRow;
      sy = changePercentageToPixels(sy, "height", image);
      let width =
        100 -
        removePercentageSymbol(rightCol) -
        removePercentageSymbol(leftCol);
      width = width.toString() + "%";
      width = changePercentageToPixels(width, "width", image);

      let height =
        100 -
        removePercentageSymbol(bottomRow) -
        removePercentageSymbol(topRow);
      height = height.toString() + "%";
      height = changePercentageToPixels(height, "height", image);

      // sx = Math.floor(sx);
      // sy = Math.floor(sy);
      // width = Math.floor(width);
      // height = Math.floor(height);

      let rightEdgeCoordinate = sx + width;
      let bottomEdgeCoordinate = sy + height;

      // image.style.clipPath = `inset(
      //                ${topRow}
      //                ${leftCol}
      //                ${bottomRow}
      //                ${rightCol}
      //              )`;
      // image.style.display = "none";
      // console.log("trimmed image: ", image);
      // console.log("trimmed image width: ", width);
      // console.log("trimmed image height:", height);

      // const body = document.querySelector("body");
      // body.appendChild(image);

      return (
        // <div className="img">
        //   <img
        //     style={{
        //       clipPath: `inset(
        //         ${topRow}
        //         ${leftCol}
        //         ${bottomRow}
        //         ${rightCol}
        //       )`,
        //       // overflow: "hidden",
        //     }}
        //     key={i + 1}
        //     src={img.src}
        //     alt=""
        //   />
        // </div>
        <CanvasMaker
          x1={sx}
          y1={sy}
          width={width}
          height={height}
          image={image}
          reloadVariable={boxArray}
        />
      );
    });

    // console.log("triimedCanvasArray: ", array);

    setCanvasArray(array);

    // canvas1.classList.add("canvas");
    // canvas1.innerText = "No support for HTML5 canvas";
    // debugger;
    // let trimcanvas = canvasMaker(10, 10, 100, 100);

    // const imageCollection = document.querySelector(".imageCollection");
    // console.log("canvasArray: ", canvasArray);
    // canvasArray.forEach((canvas) => {
    //   imageCollection.appendChild(canvas);
    //   console.log("trimcanvas: ", canvas);
    // });

    // };
    // imageCollection.appendChild(canvas1)
  }, [boxArray]);

  useEffect(() => {
    const imageCollection = document.querySelector(".imageCollection").children;
    console.log("imagecollection: ", imageCollection);
    let urls = [];

    // console.log(imageCollection)

    for (let i = 0; i < imageCollection.length; i++) {
      // console.log("imagecollection i tagname: ", imageCollection[i].tagName);
      if (imageCollection[i].tagName === "CANVAS") {
        urls.push(imageCollection[i].toDataURL());
      }
    }

    setCanvasUrls(urls);
  }, [isDownloadFacesBoxVisible]);

  return (
    <div
      className={`DownloadFacesOverlay ${
        isDownloadFacesBoxVisible ? "active" : ""
      }`}
    >
      <div className="DownloadFacesBox">
        <nav className="Navigation">
          <button
            className="cross"
            onClick={() => {
              setDownloadFaceBoxVisible(false);
            }}
          >
            {"\u00d7"}
          </button>
        </nav>
        <div className="imageCollection">
          {/* <div className="img">
            <img
              src="https://thumbs-prod.si-cdn.com/P4Smi9MthEBXH7pdW8Y-bvwR6ts=/1072x720/filters:no_upscale()/https://public-media.si-cdn.com/filer/04/8e/048ed839-a581-48af-a0ae-fac6fec00948/gettyimages-168346757_web.jpg"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/42/Shaqi_jrvej.jpg"
              alt=""
            />
          </div>
          <img
            src="https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2017/11/04133712/waterfall.jpg"
            alt=""
          />
          <div className="img">
            <img
              src="https://images.theconversation.com/files/399816/original/file-20210510-5797-xqoxsr.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
              alt=""
            />
          </div>

          <div className="img">
            <img
              src="https://scx2.b-cdn.net/gfx/news/2019/2-nature.jpg"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://assets.unenvironment.org/styles/article_billboard_image/s3/2021-05/alberta-2297204_1920.jpg?h=1483c54f&amp;itok=GdjA9GRu"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Independence-Lake-Clean-Drinking-Water_4000x2200.jpg?crop=1175,0,1650,2200&wid=600&hei=800&scl=2.75"
              alt=""
            />
          </div> */}
          {canvasArray}
        </div>
        <div className="footer">
          <button
            className="DownloadImages_button"
            onClick={() => onButtonClick(canvasUrls)}
          >
            Download All
          </button>
        </div>
        <Spinner
          text="Loading faces"
          type="Oval"
          visible={facesGeneratedStatus}
          classes="loadingFaceSpinner"
          color="blue"
        />
      </div>
    </div>
  );
}

export default DownloadFacesOverlay;
