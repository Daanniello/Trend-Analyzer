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

    // const loggedIn = window.localStorage.loggedIn;
    // console.log(loggedIn);
    window.localStorage.loggedIn = undefined;

    this.state = {
      currentPage: 0,
      pages: [<GeneralPage />, <TopicPage />, <div />],
      lastUpdated: "16-05-2019 15:00",
      pinCode: "",
      apiKey: "",
      loggedIn: window.localStorage.loggedIn
    };

    this.setPage = newPage => {
      if (this.state.currentPage === newPage) return;
      const state = this.state;
      state.currentPage = newPage;
      this.setState(state);
    };

    this.addPin = async value => {
      const state = this.state;
      state.pinCode += value;
      this.setState(state);
      if (state.pinCode.length > 3) {
        if (await this.checkLogin(state.pinCode)) {
          state.loggedIn = true;
          state.apiKey = (await request.post("/login", {})).data.apiKey;
        } else {
          state.pinCode = "";
        }
      }
      this.setState(state);
    };

    this.removePin = () => {
      const state = this.state;
      this.state.pinCode = this.state.pinCode.substring(
        0,
        this.state.pinCode.length - 1
      );
      this.setState(state);
    };

    this.checkLogin = async pinCode => {
      try {
        axios.defaults.headers = {
          "x-pincode": pinCode
        };
        const key = (await request.post("/login", {})).data.apiKey;
        this.setApiKey(key);
        return true;
      } catch (error) {
        const form = document.getElementById("login-form");
        form.classList.add("login-shake");
        await new Promise(resolve => setTimeout(resolve, 700));
        form.classList.remove("login-shake");
        return false;
      }
    };

    this.getApiKey = () => {
      return this.state.apiKey;
    };

    this.setApiKey = async value => {
      const state = this.state;
      state.apiKey = value;
      this.setState(state);
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
              />
            </DialogContent>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
