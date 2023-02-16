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

const initialState = {
  input: "",
  submitStatus: false,
  boxArray: [],
  route: "signin",
  userData: {},
  isMessageVisible: false,
  messageDisplay: "",
  isDownloadFacesBoxVisible: false,
  isGenerateFacesButtonActive: false,
};

const removeMillisecond = (obj) => {
  let str;
  if (obj) str = obj.joined;

  if (str === null || str === undefined) return obj;

  str = str.split("");
  for (let i = 0; i < str.length; i++) {
    // console.log(str[i])

    if (str[i] === "T") str[i] = " ";

    if (str[i] === ".") {
      for (; i < str.length; i++) {
        str[i] = "";
      }
      break;
    }
  }
  str = str.join("");
  obj.joined = str;

  return obj;
};

const Reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ON_INPUT_CHANGE:
      // statements_1
      return Object.assign({}, state, { input: action.payload, boxArray: [] });
      break;
    case ON_SUBMIT:
      return Object.assign({}, state, { submitStatus: true });
      break;
    case SET_SUBMIT_FALSE:
      return Object.assign({}, state, { submitStatus: false });
      break;
    case SET_BOX:
      return Object.assign({}, state, { boxArray: action.payload });
      break;
    case ROUTE_CHANGE:
      return Object.assign({}, state, { route: action.payload });
      break;
    case SET_USER_DATA:
      let obj = Object.assign({}, action.payload);
      obj = removeMillisecond(obj);
      return Object.assign({}, state, { userData: obj });
      break;
    case CLEAR_INPUT_DATA:
      return Object.assign({}, initialState);
      break;

    case SET_MESSAGE_VISIBLE:
      return Object.assign({}, state, { isMessageVisible: action.payload });
      break;
    case SET_MESSAGE:
      return Object.assign({}, state, { messageDisplay: action.payload });
      break;
    case SET_DownloadFacesBox_VISIBLE:
      return Object.assign({}, state, {
        isDownloadFacesBoxVisible: action.payload,
      });
      break;
    case SET_GenerateFacesButton_ACTIVE:
      return Object.assign({}, state, {
        isGenerateFacesButtonActive: action.payload,
      });
      break;
    case ON_INPUT_CHANGE_DIRECT:
      return Object.assign({}, state, { input: action.payload, boxArray: [] });
      break;
    default:
      // statements_def
      return state;
      break;
  }
};

export { Reducer };
