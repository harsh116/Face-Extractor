import { Component, useState } from "react";
import "./DeleteConfirmOverlay.scss";
import { HOST } from "../../constants";
import { setCookies, getCookie } from "../../cookies";

const DeleteConfirmOverlay = (props) => {
  const [deleteEnabled, setDeleteEnabled] = useState(false);

  // * ======================Callback Functions=======================================

  const deleteAccount = (onRouteChange) => {
    fetch(`${HOST}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("message returned: ", data);
        if (data.message === "Success") {
          fetch(`${HOST}/signout`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: getCookie("cookie1"),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              props.onClearInputData();
              onRouteChange("signin");
            });

          setCookies("cookie1", JSON.stringify({}), 0);
        } else alert(data.message);
      })
      .catch(console.log);

    props.setOverlayVisible(false);
  };

  const cancelDelete = () => {
    props.setOverlayVisible(false);
    const securitytext = document.querySelector("#securitytext");
    securitytext.value = "";
  };

  const checkInput = (event) => {
    console.log(event.target.value);
    let text = event.target.value;
    if (text.toLowerCase() === props.userData.name.toLowerCase())
      setDeleteEnabled(true);
    else setDeleteEnabled(false);
  };

  // * ======================JSX========================= *
  return (
    <div
      className={`DeleteConfirmOverlay ${
        props.isOverLayVisible ? "active" : ""
      }`}
      onDoubleClick={() => props.setOverlayVisible(false)}
    >
      <div
        className="DeleteConfirmBox red-border "
        onDoubleClick="event.preventDefault ? event.preventDefault() : event.returnValue = false;"
      >
        <div className="ConfirmMessage">
          <h3>Are you sure you want to delete your account?</h3>
        </div>

        <input
          type="text"
          id="securitytext"
          className="securityText"
          onChange={checkInput}
        />
        <br />
        <p>Type your name first</p>
        <p class="securityName">{props.userData.name}</p>

        <div className="options">
          <button
            className={`confirmDelete  ${
              deleteEnabled ? "enabled pointer" : ""
            }`}
            onClick={
              deleteEnabled ? () => deleteAccount(props.onRouteChange) : ""
            }
          >
            Ok <i className={`fas fa-check Profile_editIcon`}></i>{" "}
          </button>
          <button className="cancelDelete pointer" onClick={cancelDelete}>
            Cancel <i className={`fas fa-times pointer cross_editIcon`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmOverlay;
