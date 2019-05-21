import React from "react";
import "./login-form.css";

import Lock from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";

import LoginPad from "./login-pad";

const LoginForm = props => {
  const blueBalls = [];
  for (let i = 0; i < 4; i++) {
    const ball = (
      <div
        key={i}
        className={
          "pin-ball" +
          (props.pinCode.length > i ? " pin-ball-active" : " pin-ball-inactive")
        }
      />
    );

    blueBalls.push(ball);
  }

  return (
    <div id="login-modal">
      <div id="login-form">
        <div id="login-form-header">
          <Lock fontSize="inherit" />
        </div>
        <Typography variant="subtitle1" align="center">
          Enter your 4-digit Pincode
        </Typography>
        <div id="pin-balls">{blueBalls}</div>
        <LoginPad addPin={props.addPin} removePin={props.removePin} />
      </div>
    </div>
  );
};

export default LoginForm;
