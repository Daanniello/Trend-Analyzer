import React from "react";
import "./login-form.css";

import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import Typography from "@material-ui/core/Typography";

import LoginPad from "./login-pad";

const LoginForm = props => {
  const blueBalls = [];

  // Shows the amount of numbers that have been input for the pincode as blue balls
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

  function showEmailPin() {
    //TODO make it so you can email the pincode
  }

  return (
    <div id="login-modal">
      <div id="login-form">
        <div id="login-form-header">
          {(() => {
            // If 4 numbers have been input show unlocking image instead of locked image
            if (props.pinCode.length === 4) {
              return <LockOpen fontSize="inherit" />;
            } else {
              return <Lock fontSize="inherit" />;
            }
          })()}
        </div>
        <Typography variant="subtitle1" align="center">
          Enter your 4-digit Pincode
        </Typography>
        <div id="pin-balls">{blueBalls}</div>
        <LoginPad addPin={props.addPin} removePin={props.removePin} />
        <div id="login-form-footer">
          {(() => {
            // If it's not possible to log in show an error message.
            var errorMessage = String(props.errorMsg);
            if (errorMessage.includes("401")) {
              return (
                <div id="login-form-footer">
                  De pincode klopt niet!
                  <a href="javascript:;" onclick={showEmailPin()}>
                    <p>Wachtwoord vergeten?</p>
                  </a>
                  <p id="email-pin" style={divStyle}>
                    <input type="email" name="emailaddress" />
                    <button type="button">E-mail pincode!</button>
                  </p>
                </div>
              );
              // TODO: Request pincode via mail
            } else if (errorMessage.includes("Network")) {
              return (
                <div id="login-form-footer">
                  Er is geen verbinding met de database!
                </div>
              );
            } else if (errorMessage.includes("404")) {
              return (
                <div id="login-form-footer">
                  De nodige database tabel bestaat niet!
                </div>
              );
            } else if (props.errormsg) {
              return <div id="login-form-footer">Er is een foutmelding!</div>;
            } else {
              return <div id="login-form-footer" />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
