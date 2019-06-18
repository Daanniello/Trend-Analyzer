import React from "react";
import "./login-form.css";

import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import LoginPad from "./login-pad";

const LoginForm = props => {
  const blueBalls = [];
  var emailInput = "";

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

  // Send mail via app.js
  function handleEmailSubmit() {
    props.sendMail(emailInput);
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
            // If user clicks forgot password, show password input
            if (props.displayEmailInputState) {
              return (
                <div id="login-form-footer">
                  <TextField
                    style={{ marginRight: "8px" }}
                    id="standard-bare"
                    placeholder="johndoe@mail.com"
                    inputProps={{ "aria-label": "bare" }}
                    onChange={evt => {
                      emailInput = evt.target.value;
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      handleEmailSubmit();
                    }}
                    color="primary"
                  >
                    Mail me!
                  </Button>
                </div>
              );
            } else if (errorMessage.includes("401")) {
              return (
                <div id="login-form-footer">
                  <Typography style={{ color: "firebrick" }}>
                    <p>Incorrect pincode!</p>
                  </Typography>
                  <button
                    type="button"
                    className="link-button"
                    onClick={props.displayEmailInput}
                  >
                    <p>Forgot the pincode?</p>
                  </button>
                </div>
              );
            } else if (errorMessage.includes("Network")) {
              return (
                <div id="login-form-footer">
                  <Typography style={{ color: "firebrick" }}>
                    No connection to the database!
                  </Typography>
                </div>
              );
            } else if (errorMessage.includes("404")) {
              return (
                <div id="login-form-footer">
                  <Typography style={{ color: "firebrick" }}>
                    The database does not exist!
                  </Typography>
                </div>
              );
            } else if (props.errormsg) {
              return (
                <div id="login-form-footer">
                  <Typography style={{ color: "firebrick" }}>
                    An unexpected error has occured!
                  </Typography>
                </div>
              );
            } else if (errorMessage.includes("E-mail")) {
              return (
                <div id="login-form-footer">
                  <Typography style={{ color: "darkgreen" }}>
                    {" "}
                    Please check your e-mail for the pincode!
                  </Typography>
                </div>
              );
            } else {
              return (
                <div id="login-form-footer">
                  <button
                    type="button"
                    className="link-button"
                    onClick={props.displayEmailInput}
                  >
                    <p>Forgot the pincode?</p>
                  </button>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
