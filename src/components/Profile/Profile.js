import { Component, useState, Fragment } from "react";
import "./Profile.scss";
import DeleteConfirmOverlay from "../DeleteConfirmOverlay/DeleteConfirmOverlay";
import {
  HOST,
  CLARIFAI_API_USER_LIMIT,
  CLARIFAI_API_GUEST_LIMIT,
} from "../../constants";

const Cross = () => {};

const Tick = () => {};

// *=================== MainProfile Component ========================== *

const MainProfile = (props) => {
  console.log(props);

  return (
    <div className="Main mt-2">
      <div className="Main_headings col-40">
        <p class="heading">ID</p>
        <hr />
        <p class="heading">Email</p>
        <hr />
        <p class="heading">Password</p>
        <hr />
        <p class="heading mt-2">Created At</p>
        <hr className="broadline" />
      </div>

      <div className="Main_data col-60">
        <p class="heading">{props.userData.id}</p>
        <hr />
        <p class="heading">{props.userData.email}</p>
        <hr />

        <span
          className={`flexPassword centerStable ${
            props.editablePassword ? "increase-width" : ""
          }`}
        >
          <p
            id="password"
            class={`heading ${
              props.editablePassword ? "editable" : ""
            } editablePassword `}
          >
            {"****"}{" "}
          </p>
          <i
            class={`fas ${
              props.editablePassword ? "fa-check" : "fa-edit"
            } pointer Profile_editIcon   ml-1  small-icon`}
            onClick={
              props.editablePassword ? props.submitPassword : props.editPassWord
            }
          ></i>
          <i
            class={`fas ${
              props.editablePassword ? "fa-times inline-block" : "none"
            } pointer cross_editIcon  ml-1`}
            onClick={props.cancelPassword}
          ></i>{" "}
        </span>
        <hr />
        <p class="heading mt-2">{props.userData.joined}</p>
        <hr class="broadline" />
      </div>
    </div>
  );
};

const Profile = (props) => {
  const { alertMessage } = props;

  const [editableName, setEditableName] = useState(false);
  const [editablePassword, setEditablePassword] = useState(false);
  const [name, setName] = useState(props.userData.name);
  const [isOverLayVisible, setOverlayVisible] = useState(false);

  const LIMIT = props.userData.verified
    ? CLARIFAI_API_USER_LIMIT
    : CLARIFAI_API_GUEST_LIMIT;

  //*======================Callback Functions==============*

  const editPassWord = () => {
    setEditablePassword(true);
    const password = document.querySelector("#password");
    password.setAttribute("contentEditable", "true");
    password.innerText = "";
  };

  const editName = () => {
    setEditableName(true);
    const name1 = document.querySelector("#name");
    name1.setAttribute("contentEditable", "true");
  };

  const submitPassword = () => {
    const password = document.querySelector("#password");

    if (password.innerText === "") {
      alert("Empty Password");
      return;
    }

    fetch(`${HOST}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        type: "password",
        id: props.userData.id,
        data: password.innerText,
        email: props.userData.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          alertMessage("Your password is changed successfully");
        } else alert(data.message);
        password.innerText = "****";
      });
    password.setAttribute("contentEditable", "false");
    setEditablePassword(false);
  };

  const cancelPassword = () => {
    const password = document.querySelector("#password");
    password.innerText = "****";

    password.setAttribute("contentEditable", "false");
    setEditablePassword(false);
  };

  const submitName = () => {
    const name1 = document.querySelector("#name");

    if (name1.innerText === "") {
      alert("Empty Name");
      return;
    }

    fetch(`${HOST}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        type: "name",
        id: props.userData.id,
        data: name1.innerText,
        email: props.userData.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          props.onUserData(data.data);
          console.log("name: ", data.data.name);
          setName(data.data.name);
          alertMessage("Your name is changed successfully");
        } else {
          alertMessage(data.message);
          name1.innerText = props.userData.name;
        }
      });

    name1.setAttribute("contentEditable", "false");
    setEditableName(false);
  };

  const cancelName = () => {
    const name1 = document.querySelector("#name");
    name1.innerText = props.userData.name;

    name1.setAttribute("contentEditable", "false");
    setEditableName(false);
  };

  //*====================JSX===========================*
  return (
    <div className="Profile center">
      <button
        className="delete_icon_button pointer"
        onClick={() => {
          console.log("true visible");
          setOverlayVisible(true);
        }}
      >
        <i className="fas fa-trash pointer delete_icon"></i>
      </button>
      <DeleteConfirmOverlay
        isOverLayVisible={isOverLayVisible}
        setOverlayVisible={setOverlayVisible}
        userData={props.userData}
        onRouteChange={props.onRouteChange}
        onUserData={props.onUserData}
        onClearInputData={props.onClearInputData}
      />
      <img src="images/whatsapp_pic.png" class="profile_photo" />
      <br />
      <h2
        id="name"
        class={`Profile_name ${editableName ? "editable" : ""} inline-block`}
      >
        {name}{" "}
      </h2>
      <i
        class={`fas ${
          editableName ? "fa-check" : "fa-edit"
        } pointer Profile_editIcon inline-block ml-1`}
        onClick={editableName ? submitName : editName}
      ></i>{" "}
      <i
        class={`fas ${
          editableName ? "fa-times inline-block" : "none"
        } pointer cross_editIcon  ml-1`}
        onClick={cancelName}
      ></i>{" "}
      <MainProfile
        userData={props.userData}
        editablePassword={editablePassword}
        setEditable={setEditablePassword}
        editPassWord={editPassWord}
        submitPassword={submitPassword}
        cancelPassword={cancelPassword}
      />
      <h1 className="entriesNo">
        {props.userData.entries <= LIMIT ? LIMIT - props.userData.entries : 0}
      </h1>
      <p className="entriesStatement">Entries Left</p>
    </div>
  );
};

export default Profile;
