import "./ToggleAnimation.scss";
import { useState } from "react";

function ToggleAnimation(props) {
  const [isSliderOn, setSliderOn] = useState(true);
  const { setAnimationEnabled } = props;
  return (
    <div className="ToggleAnimation">
      <div
        className={`toggleBox ${isSliderOn ? "active" : ""}`}
        title="Animation uses GPU. If hardware accelaration is not supported then toggle it off."
        onClick={() => {
          if (isSliderOn) {
            setSliderOn(false);
            setAnimationEnabled(false);
          } else {
            setSliderOn(true);
            setAnimationEnabled(true);
          }
        }}
      >
        <div className="toggleSlider"></div>
      </div>
      <span>Animation</span>
    </div>
  );
}

export default ToggleAnimation;
