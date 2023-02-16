import "./GenerateFaces.scss";

const GenerateFaces = (props) => {
  const { isGenerateFacesButtonActive, setDownloadFaceBoxVisible } = props;
  return (
    <div className="GenerateFaces">
      <button
        title="Generate individual images of faces"
        className={`GenerateFaces_button ${
          isGenerateFacesButtonActive ? "active" : ""
        }`}
        onClick={
          isGenerateFacesButtonActive
            ? () => {
                props.setDownloadFaceBoxVisible(true);
              }
            : () => {
                props.setDownloadFaceBoxVisible(false);
              }
        }
      >
        Generate Photos
      </button>
    </div>
  );
};

export default GenerateFaces;
