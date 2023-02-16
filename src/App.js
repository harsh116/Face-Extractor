import React, { Component } from "react";
import { connect } from "react-redux";
import Clarifai from "clarifai";
import IdleTimer from "react-idle-timer";

import { setCookies, getCookie } from "./cookies";

import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import PromptMessage from "./components/PromptMessage/PromptMessage";
import GenerateFaces from "./components/GenerateFaces/GenerateFaces";
import DownloadFacesOverlay from "./components/DownloadFacesOverlay/DownloadFacesOverlay";
import ToggleAnimation from "./components/ToggleAnimation/ToggleAnimation";
import ImageUploadBox from "./components/ImageUploadBox/ImageUploadBox";
import Spinner from "./components/Spinner/Spinner";

import Particles from "react-particles-js";
import particlesConfig from "./particles-config.js";
import {
  inputChange,
  submit,
  action_setSubmitFalse,
  action_setBox,
  routeChange,
  setUserData,
  clearInputData,
  action_setMessageVisibility,
  action_setMessage,
  action_setDownloadFaceBoxVisible,
  action_setGenerateFacesButtonActive,
  action_setInputChangeDirect,
} from "./actions";

import {
  HOST,
  GUEST_MESSAGE,
  VERIFIED_USER_MESSAGE,
  timeout,
} from "./constants";

const mapStateToProps = (state) => {
  return {
    input: state.input,
    submitStatus: state.submitStatus,
    boxArray: state.boxArray,
    route: state.route,
    userData: state.userData,
    isMessageVisible: state.isMessageVisible,
    messageDisplay: state.messageDisplay,
    isDownloadFacesBoxVisible: state.isDownloadFacesBoxVisible,
    isGenerateFacesButtonActive: state.isGenerateFacesButtonActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => dispatch(inputChange(event.target.value)),
    onSubmit: () => dispatch(submit()),
    setSubmitFalse: () => dispatch(action_setSubmitFalse()),
    setBox: (box) => dispatch(action_setBox(box)),
    onRouteChange: (text) => dispatch(routeChange(text)),
    onUserData: (obj) => dispatch(setUserData(obj)),
    onClearInputData: () => dispatch(clearInputData()),
    setMessageVisible: (state) => dispatch(action_setMessageVisibility(state)),
    setMessageDisplay: (text) => dispatch(action_setMessage(text)),
    setDownloadFaceBoxVisible: (bool) =>
      dispatch(action_setDownloadFaceBoxVisible(bool)),
    setGenerateFacesButtonActive: (bool) =>
      dispatch(action_setGenerateFacesButtonActive(bool)),
    setInputChangeDirect: (text) => dispatch(action_setInputChangeDirect(text)),
  };
};

class App extends Component {
  componentDidMount() {
    const { onRouteChange, onUserData, setMessageDisplay, setMessageVisible } =
      this.props;

    const alertMessage = (message) => {
      // debugger;
      setMessageDisplay(message);
      setMessageVisible(true);
    };
    // console.log(JSON.parse(getCookie("cookie1")));
    console.log(
      "body post: ",
      JSON.stringify({
        userId: JSON.parse(getCookie("cookie1")).userId,
      })
    );

    fetch(`${HOST}/checkSession`, {
      method: "POST",
      // headers: { session: { userId: JSON.parse(getCookie("cookie1")).userId } },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      body: getCookie("cookie1"),
    })
      .then((res) => {
        // console.log("res: ", res);
        return res.json();
      })
      .then(async (data) => {
        if (data.message === "sessionActive") {
          onUserData(data.user);
          onRouteChange("home");

          console.log("data.user: ", data.user);

          const { verified, verified_seen } = data.user;

          if (verified && verified_seen === false) {
            let res1 = await fetch(`${HOST}/verified-seen`, {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.user.email,
              }),
            });
            alertMessage(VERIFIED_USER_MESSAGE);
            onUserData(Object.assign({}, data.user, { verified_seen: true }));
          }
        }
      });
  }

  constructor() {
    super();

    this.idleTimer = null;

    this.handleOnActive = this.handleOnActive.bind(this);
    this.handleOnIdle = this.handleOnIdle.bind(this);
    this.setAnimationEnabled = this.setAnimationEnabled.bind(this);
    this.setSpinnerVisible = this.setSpinnerVisible.bind(this);
    this.setFaceDetectionPendingStatus =
      this.setFaceDetectionPendingStatus.bind(this);

    this.state = {
      update: "false",
      isAnimationActive: true,
      isAnimationEnabled: true,
      spinnerVisible: false,
      faceDetectionPendingStatus: false,
    };
  }

  handleOnActive(event) {
    console.log("user is active", event);
    console.log("time remaining", this.idleTimer.getRemainingTime());
    this.setState({ isAnimationActive: true });
  }

  handleOnIdle(event) {
    console.log("user is idle", event);
    console.log("last active", this.idleTimer.getLastActiveTime());
    this.setState({ isAnimationActive: false });
  }

  setAnimationEnabled(bool) {
    this.setState({ isAnimationEnabled: bool });
  }

  setSpinnerVisible(bool) {
    console.log("setSpinnerVisible: ", bool);
    this.setState({ spinnerVisible: bool });
  }

  setFaceDetectionPendingStatus(bool) {
    this.setState({ faceDetectionPendingStatus: bool });
  }

  render() {
    const {
      input,
      onInputChange,
      submitStatus,
      onSubmit,
      setSubmitFalse,
      boxArray,
      setBox,
      onRouteChange,
      route,
      onUserData,
      userData,
      onClearInputData,
      isMessageVisible,
      setMessageVisible,
      messageDisplay,
      setMessageDisplay,
      setDownloadFaceBoxVisible,
      isDownloadFacesBoxVisible,
      setGenerateFacesButtonActive,
      isGenerateFacesButtonActive,
      setInputChangeDirect,
    } = this.props;

    const alertMessage = (message) => {
      // debugger;
      setMessageDisplay(message);
      setMessageVisible(true);
    };

    return (
      <div className="App">
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={timeout}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
        />
        <ToggleAnimation setAnimationEnabled={this.setAnimationEnabled} />
        <Particles
          className={`particles ${
            this.state.isAnimationActive && this.state.isAnimationEnabled
              ? ""
              : "none1"
          }`}
          params={particlesConfig}
        />
        <Navigation
          onRouteChange={onRouteChange}
          route={route}
          onUserData={onUserData}
          onClearInputData={onClearInputData}
          userData={userData}
        />
        <PromptMessage
          messageDisplay={messageDisplay}
          isMessageVisible={isMessageVisible}
          setMessageVisible={setMessageVisible}
          alertMessage={alertMessage}
        />
        {route === "signin" ? (
          <Signin
            onRouteChange={onRouteChange}
            onUserData={onUserData}
            alertMessage={alertMessage}
          />
        ) : route === "register" ? (
          <Register
            onRouteChange={onRouteChange}
            onUserData={onUserData}
            alertMessage={alertMessage}
          />
        ) : route === "profile" ? (
          <Profile
            userData={userData}
            onUserData={onUserData}
            onRouteChange={onRouteChange}
            onClearInputData={onClearInputData}
            alertMessage={alertMessage}
          />
        ) : (
          <div>
            <Logo />
            <Rank userData={userData} />
            <ImageLinkForm
              onInputChange={onInputChange}
              input={input}
              submitStatus={submitStatus}
              onSubmit={onSubmit}
              Clarifai={Clarifai}
              setSubmitFalse={setSubmitFalse}
              setBox={setBox}
              userData={userData}
              onUserData={onUserData}
              alertMessage={alertMessage}
              setGenerateFacesButtonActive={setGenerateFacesButtonActive}
              setFaceDetectionPendingStatus={this.setFaceDetectionPendingStatus}
            />

            <div className="OR">OR</div>
            <ImageUploadBox
              setInputChangeDirect={setInputChangeDirect}
              alertMessage={alertMessage}
              setSpinnerVisible={this.setSpinnerVisible}
              input={input}
            />
            <Spinner
              visible={this.state.spinnerVisible}
              text={"Loading Image"}
              type="Circles"
            />
            <GenerateFaces
              isGenerateFacesButtonActive={isGenerateFacesButtonActive}
              setDownloadFaceBoxVisible={setDownloadFaceBoxVisible}
            />
            <FaceRecognition
              input={input}
              boxArray={boxArray}
              faceDetectionPendingStatus={this.state.faceDetectionPendingStatus}
            />
            <DownloadFacesOverlay
              setDownloadFaceBoxVisible={setDownloadFaceBoxVisible}
              isDownloadFacesBoxVisible={isDownloadFacesBoxVisible}
              alertMessage={alertMessage}
              boxArray={boxArray}
              input={input}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
