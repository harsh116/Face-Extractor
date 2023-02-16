import React from "react";
import { useState, useEffect } from "react";
import "./Register.css";
import { setCookies, getCookie, setCookieResetDaily } from "../../cookies";
import { HOST, GUEST_MESSAGE, REGISTERATION_LIMIT } from "../../constants";

const Register = (props) => {
  const { alertMessage } = props;

  const [signInEmail, setEmail] = useState("");
  const [signInPassword, setPassword] = useState("");
  const [signInName, setName] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onSubmitSignIn = () => {
    console.log("registerState: ", { signInName, signInEmail, signInPassword });

    const registrationCount =
      JSON.parse(getCookie("cookie2"))?.countRegistered || 0;

    if (registrationCount >= REGISTERATION_LIMIT) {
      alert("Registration limit for today exceeded");
      return;
    }

    if (signInName === "") {
      alert("Name field empty");
      return;
    } else if (signInEmail === "") {
      alert("Email field empty");
      return;
    } else if (signInPassword === "") {
      alert("Password field empty");
      return;
    }

    let obj = { name: signInName, userName: signInEmail, pass: signInPassword };
    // debugger;
    fetch(`${HOST}/register`, {
      method: "POST",

      mode: "cors",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.message === "registered") {
          setCookies("cookie1", JSON.stringify(data.cookies), 1);
          props.onUserData(data.data);
          props.onRouteChange("home");
          alertMessage(GUEST_MESSAGE);

          let AuthenticationTokenSendStatus = await fetch(
            `${HOST}/sendAuthenticationToken`,
            {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: signInEmail }),
            }
          );

          AuthenticationTokenSendStatus =
            await AuthenticationTokenSendStatus.json();
          if (AuthenticationTokenSendStatus.message !== "congrats") {
            alert(AuthenticationTokenSendStatus.message);
            return;
          }

          let cookie2 = JSON.parse(getCookie("cookie2"));

          if (JSON.stringify(cookie2) !== "{}") {
            console.log("cookie2 present: ", cookie2);
            setCookieResetDaily(
              "cookie2",
              JSON.stringify({ countRegistered: cookie2.countRegistered + 1 })
            );
          } else {
            setCookieResetDaily(
              "cookie2",
              JSON.stringify({ countRegistered: 1 })
            );
          }
        } else {
          console.log("annoying registration: ", data);
          alert(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="br2 ba dark-gray b--black-10 w-100 w-50-m w-25-l mv4 mw6 center increaseWidth">
      {/* <article className="br2 ba dark-gray b--black-10 w-100 w-50-m w-25-l mv4 center "> */}
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="name">
                Name
              </label>
              <input
                onChange={onNameChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
              />
            </div>
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
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
