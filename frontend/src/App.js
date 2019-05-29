import React from "react";
import { Component } from "react";
import "./App.css";

import Navigation from "./components/navigation/Navigation";
import LoginForm from "./components/login/login-form";
import GeneralPage from "./pages/GeneralPage";
import TopicPage from "./pages/TopicPage";

import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";

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
      loggedIn: true
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
      if (pinCode === "1234") {
        return true;
      }
      const form = document.getElementById("login-form");
      form.classList.add("login-shake");
      await new Promise(resolve => setTimeout(resolve, 700));
      form.classList.remove("login-shake");
      return false;
    };
  }

  render() {
    return (
      <div id="app">
        <Navigation
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
