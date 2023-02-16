import { useEffect, useRef, useState } from "react";
const CanvasWidth = "100";
// import { Fraction } from "fractional";

export const CanvasMaker = (props) => {
  //   debugger;
  const canvasRef = useRef(null);

  const { reloadVariable } = props;
  //   const [aspectRatio, setAspectRatio] = useState("1/1");
  const [heightCanvas, setHeightCanvas] = useState("100");

  useEffect(() => {
    // debugger;
    const { x1, y1, width, height, image } = props;

    // console.log("fraction: ", new Fraction(width / height).toString());

    // setHeightCanvas();

    // x = y = 10;
    // width = height = 100;
    let canvas = canvasRef.current;
    canvas.style.border = "1px solid #d3d3d3";

    setHeightCanvas(((height / width) * Number(CanvasWidth)).toString());

    // console.log(
    //   "canvas height should: ",
    //   ((height / width) * Number(CanvasWidth)).toString()
    // );
    // console.log("canvas height: ", canvas.height);

    const ctx = canvas.getContext("2d");

    let dpi = window.devicePixelRatio;

    canvas.width = canvas.width * dpi;
    canvas.height = canvas.height * dpi;

    // canvas.setAttribute("width", canvas.style.width() * dpi);
    // canvas.setAttribute("height", canvas.style.height() * dpi);

    // const img = document.querySelector("#trimmedimg");

    if (!image) {
      return;
    }

    // const image1 = new Image();

    try {
      image.crossOrigin = "";
    } catch (err) {
      console.log(err);
    } finally {
      image.addEventListener("load", () => {
        console.log("image loaded");

        //   ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
          image,
          x1,
          y1,
          width,
          height,
          0,
          0,
          CanvasWidth,
          (height / width) * CanvasWidth
        );

        let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height),
          l = pixels.data.length,
          i,
          bound = {
            top: null,
            left: null,
            right: null,
            bottom: null,
          },
          x,
          y;

        for (i = 0; i < l; i += 4) {
          if (pixels.data[i + 3] !== 0) {
            x = (i / 4) % canvas.width;
            y = ~~(i / 4 / canvas.width);

            // console.log(` ${i} initial x: `,x)
            // console.log(` ${i} initial y: `,y)

            if (bound.top === null) {
              bound.top = y;
            }

            if (bound.left === null) {
              bound.left = x;
            } else if (x < bound.left) {
              bound.left = x;
            }

            if (bound.right === null) {
              bound.right = x;
            } else if (bound.right < x) {
              bound.right = x;
            }

            if (bound.bottom === null) {
              bound.bottom = y;
            } else if (bound.bottom < y) {
              bound.bottom = y;
            }
          }
        }

        var trimHeight = bound.bottom - bound.top,
          trimWidth = bound.right - bound.left,
          trimmed = ctx.getImageData(
            bound.left,
            bound.top,
            trimWidth,
            trimHeight
          );

        // console.log("ctx getdata: ", trimmed);

        ctx.canvas.width = trimWidth;
        ctx.canvas.height = trimHeight;
        ctx.putImageData(trimmed, 0, 0);

        // console.log("trimwisth: ", trimWidth);
        // console.log("trimheight: ", trimHeight);

        //   debugger;
      });
    }
    // console.log("image changed: ", image);

    // image.onload = () => {

    //   // debugger;
    //   // canvas = trim(canvas);
    // };
  }, [reloadVariable]);

  return (
    <canvas
      //   aspectRatio={aspectRatio}
      //   aspectRatio={"340042373 / 500000000"}
      width={CanvasWidth}
      height={heightCanvas}
      //   width="200"
      //   height="300"
      className="canvas"
      ref={canvasRef}
    >
      Canvas not supported
    </canvas>
  );
};
