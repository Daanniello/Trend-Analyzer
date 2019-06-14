import React from "react";
import "./login-pad.css";

import Backspace from "@material-ui/icons/Backspace";

// Interface for users to input pincode numbers or get rid of them
const LoginPad = props => {
  return (
    <div id="login-pad">
      <div className="login-pad-key" onClick={() => props.addPin(1)}>
        <p className="login-pad-key-text">1</p>
      </div>
      <div className="login-pad-key" onClick={() => props.addPin(2)}>
        <p className="login-pad-key-text">2</p>
      </div>
      <div className="login-pad-key" onClick={() => props.addPin(3)}>
        <p className="login-pad-key-text">3</p>
      </div>
      <div className="login-pad-key" onClick={() => props.addPin(4)}>
        <p className="login-pad-key-text">4</p>
      </div>
      <div className="login-pad-key" onClick={() => props.addPin(5)}>
        <p className="login-pad-key-text">5</p>
      </div>
      <div className="login-pad-key" onClick={() => props.addPin(6)}>
        <p className="login-pad-key-text">6</p>
      </div>
      <div className="login-pad-key" onClick={() => props.addPin(7)}>
        <p className="login-pad-key-text">7</p>
      </div>
      <div className="login-pad-key" onClick={() => props.addPin(8)}>
        <p className="login-pad-key-text">8</p>
      </div>
      <div className="login-pad-key" onClick={() => props.addPin(9)}>
        <p className="login-pad-key-text">9</p>
      </div>
      <div className="login-pad-key" />
      <div className="login-pad-key" onClick={() => props.addPin(0)}>
        <p className="login-pad-key-text">0</p>
      </div>
      <div className="login-pad-key">
        <p
          className="login-pad-key-text login-pad-backspace"
          onClick={() => props.removePin()}
        >
          <Backspace fontSize="inherit" />
        </p>
      </div>
    </div>
  );
};

export default LoginPad;
