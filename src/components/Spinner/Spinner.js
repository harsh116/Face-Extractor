import "./Spinner.scss";

import Loader from "react-loader-spinner";

function Spinner(props) {
  const { visible, text, type } = props;
  let classes = props.classes || "";
  const color = props.color || "#fff";
  let color1 = props.color;
  //   console.log("is spinner visible: ", visible);
  return (
    <div className={`Spinner ${classes} ${visible ? "" : "none"}`}>
      <Loader
        type={type}
        color={color}
        height={50}
        width={50}
        timeout={0} //30 secs
      />
      <span style={color1 ? { color: color } : {}} class="Loading_Text">
        {text}
      </span>
    </div>
  );
}

export default Spinner;
