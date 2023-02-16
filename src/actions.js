import {
  ON_INPUT_CHANGE,
  ON_SUBMIT,
  SET_SUBMIT_FALSE,
  SET_BOX,
  ROUTE_CHANGE,
  SET_USER_DATA,
  CLEAR_INPUT_DATA,
  SET_MESSAGE_VISIBLE,
  SET_MESSAGE,
  SET_DownloadFacesBox_VISIBLE,
  SET_GenerateFacesButton_ACTIVE,
  ON_INPUT_CHANGE_DIRECT,
} from "./constants";

export const inputChange = (text) => {
  return {
    type: ON_INPUT_CHANGE,
    payload: text,
  };
};

export const submit = () => {
  return {
    type: ON_SUBMIT,
  };
};

export const action_setSubmitFalse = () => {
  return {
    type: SET_SUBMIT_FALSE,
  };
};

export const action_setBox = (boxArray) => {
  return {
    type: SET_BOX,
    payload: boxArray,
  };
};

export const routeChange = (text) => {
  return {
    type: ROUTE_CHANGE,
    payload: text,
  };
};

export const setUserData = (obj) => {
  return {
    type: SET_USER_DATA,
    payload: obj,
  };
};

export const clearInputData = () => {
  return {
    type: CLEAR_INPUT_DATA,
  };
};

export const action_setMessageVisibility = (state) => {
  return {
    type: SET_MESSAGE_VISIBLE,
    payload: state,
  };
};

export const action_setMessage = (text) => {
  return {
    type: SET_MESSAGE,
    payload: text,
  };
};

export const action_setDownloadFaceBoxVisible = (bool) => {
  return {
    type: SET_DownloadFacesBox_VISIBLE,
    payload: bool,
  };
};

export const action_setGenerateFacesButtonActive = (bool) => {
  return {
    type: SET_GenerateFacesButton_ACTIVE,
    payload: bool,
  };
};

export const action_setInputChangeDirect = (text) => {
  return {
    type: ON_INPUT_CHANGE_DIRECT,
    payload: text,
  };
};
