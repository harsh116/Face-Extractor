import React from "react";
import { useState, useEffect } from "react";
import { setCookies, getCookie } from "../../cookies";

import { HOST, GUEST_MESSAGE } from "../../constants";
// import { json } from "express";

const Signin = (props) => {
  const [signInEmail, setEmail] = useState("");
  const [signInPassword, setPassword] = useState("");

  const { alertMessage } = props;

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    console.log("signInState: ", { signInEmail, signInPassword });

    if (signInEmail === "") {
      alert("Empty email field");
      return;
    } else if (signInPassword === "") {
      alert("Empty password field");
      return;
    }

    let obj = { userName: signInEmail, pass: signInPassword };
    // debugger;
    fetch(`${HOST}/signin`, {
      method: "POST",

      mode: "cors",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "congrats") {
          console.log("incoming cookies: ", JSON.stringify(data.cookies));
          setCookies("cookie1", JSON.stringify(data.cookies), 1);
          props.onUserData(data.data);
          props.onRouteChange("home");
          // alertMessage(GUEST_MESSAGE);
        } else alert(data.message);
      })
      .catch((err) => console.log("err: ", err));
  };

  return (
    <article
      className="br2 ba dark-gray b--black-10 w-100 w-50-m w-25-l mv4 mw5 center"
      style={
        {
          // position: 'fixed' ,
          // top: '50%' ,
          // left: '50%'
        }
      }
    >
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="email-address">
                Email
              </label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" for="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              id="signin"
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => props.onRouteChange("register")}
              id="register"
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Signin;
