import { useEffect } from "react";
import "./PromptMessage.scss";

function PromptMessage(props) {
  let { messageDisplay } = props;
  const { isMessageVisible, setMessageVisible } = props;

  useEffect(() => {
    if (isMessageVisible) {
      setTimeout(() => {
        setMessageVisible(false);
      }, 10000);
    }
  }, [isMessageVisible]);

  messageDisplay = messageDisplay.trimStart();
  messageDisplay = messageDisplay.trimEnd();

  console.log("messageDisplay: ", messageDisplay);
  console.log("messageVisible: ", isMessageVisible);

  return (
    <div
      className={`PromptMessage pa-v-s ${
        messageDisplay.length > 0 && isMessageVisible ? "active" : ""
      }`}
    >
      <span className="PromptMessage_Message col-90">{messageDisplay}</span>

      <span
        className="PromptMessage_cross pointer pa-s m-s"
        onClick={() => setMessageVisible(false)}
      >
        {"\u2715"}
      </span>
    </div>
  );
}

export default PromptMessage;
