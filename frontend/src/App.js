import React from "react";
import { Component } from "react";
import "./App.css";

import * as axios from "axios";
import RequestService from "./services/request-service";

import Navigation from "./components/navigation/Navigation";
import LoginForm from "./components/login/login-form";
import GeneralPage from "./pages/GeneralPage";
import TopicPage from "./pages/TopicPage";

import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";

const request = new RequestService();

class App extends Component {
  constructor(props) {
    super(props);

    // Stores wheter logged in
    window.localStorage.loggedIn = undefined;

    // The state of the app. Changes what the user sees and includes code needed to access certain pages.
    this.state = {
      currentPage: 0,
      pages: [<GeneralPage />, <TopicPage />, <div />],
      lastUpdated: "16-05-2019 15:00",
      pinCode: "",
      errorMsg: "",
      apiKey: "",
      loggedIn: false,
      displayEmailInput: false
    };

    // Sets the current page
    this.setPage = newPage => {
      if (this.state.currentPage === newPage) return;
      const state = this.state;
      state.currentPage = newPage;
      this.setState(state);
    };

    // Adds a number to the pincode if below 4 and if 4 it sends to check if it's the correct code
    this.addPin = async value => {
      const state = this.state;
      if (state.pinCode.length < 4) {
        state.pinCode += value;
        if (state.pinCode.length === 4) {
          this.checkLogin(state);
        }
      }
      this.setState(state);
    };

    // Checks wheter login should succeed or not
    this.checkLogin = async value => {
      const state = value;
      try {
        axios.defaults.headers = {
          "x-pincode": state.pinCode
        };
        const response = await request.post("/login", {});
        state.apiKey = response.data.apiKey;
        state.loggedIn = true;
      } catch (error) {
        state.errorMsg = error;
        this.shakeIt();
        state.pinCode = "";
      }
      this.setState(state);
    };

    // Remove last pincode number input
    this.removePin = () => {
      const state = this.state;
      this.state.pinCode = this.state.pinCode.substring(
        0,
        this.state.pinCode.length - 1
      );
      this.setState(state);
    };

    this.getApiKey = () => {
      return this.state.apiKey;
    };

    this.setApiKey = async value => {
      const state = this.state;
      state.apiKey = value;
      this.setState(state);
    };

    this.toggleDisplayEmailInput = () => {
      const state = this.state;
      if (state.displayEmailInput === false) {
        state.displayEmailInput = true;
      } else {
        state.displayEmailInput = false;
      }
      this.setState(state);
    };

    // Shake the login screen (for when there is a bad request)
    this.shakeIt = async value => {
      const form = document.getElementById("login-form");
      form.classList.add("login-shake");
      await new Promise(resolve => setTimeout(resolve, 700));
      form.classList.remove("login-shake");
    };

    this.sendMail = async value => {
      const mail = value;
      try {
        axios.defaults.headers = {
          "x-email": mail
        };
        const response = await request.post("/mail", {});
        if (response.data === true) {
          const state = this.state;
          state.errorMsg = "E-mail sent!";
          this.setState(state);
          this.toggleDisplayEmailInput();
        } else {
          this.shakeIt();
          console.log("Invalid e-mail address!");
        }
      } catch (error) {
        this.shakeIt();
        console.log(error);
      }
    };
  }

  render() {
    return (
      <div id="app">
        <Navigation
          getApiKey={this.getApiKey}
          setPage={this.setPage}
          currentPage={this.state.currentPage}
          lastUpdated={this.state.lastUpdated}
        />
        {this.state.loggedIn === true ? (
          <div id="page-content">
            {this.state.pages[this.state.currentPage]}
          </div>
        ) : (
          <Modal open={true}>
            <DialogContent>
              <LoginForm
                addPin={this.addPin}
                removePin={this.removePin}
                pinCode={this.state.pinCode}
                errorMsg={this.state.errorMsg}
                displayEmailInputState={this.state.displayEmailInput}
                displayEmailInput={this.toggleDisplayEmailInput}
                sendMail={this.sendMail}
              />
            </DialogContent>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
