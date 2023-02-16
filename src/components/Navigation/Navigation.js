import React from "react";
import { HOST } from "../../constants";
import { setCookies, getCookie } from "../../cookies";

const Navigation = (props) => {
  const signOut = () => {
    fetch(`${HOST}/signout`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: getCookie("cookie1"),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.message));
    props.onUserData({});
    props.onRouteChange("signin");
    props.onClearInputData();

    setCookies("cookie1", JSON.stringify({}), 0);
  };

  const visitProfile = () => {
    props.onRouteChange("profile");
  };

  if (props.route === "home") {
    // const imageInput=document.querySelector("#imageInput");
    // if(imageInput)
    // 	imageInput.value='';

    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          id="profile"
          className="f3 link dim black underline pa3 pointer"
          onClick={visitProfile}
        >
          Profile{" "}
        </p>
        <p
          id="signout"
          className="f3 link dim black underline pa3 pointer"
          onClick={signOut}
        >
          Sign Out
        </p>
      </nav>
    );
  } else if (props.route === "profile") {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          id="signout"
          className="f3 link dim black underline pa3 pointer"
          onClick={() => props.onRouteChange("home")}
        >
          Home
        </p>
      </nav>
    );
  } else
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          id="Signin"
          className="f3 link dim black underline pa3 pointer"
          onClick={() => props.onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          id="Register"
          className="f3 link dim black underline pa3 pointer"
          onClick={() => props.onRouteChange("register")}
        >
          Register
        </p>
      </nav>
    );
};

export default Navigation;
