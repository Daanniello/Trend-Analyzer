import React from "react";
import { Component } from "react";
import "./App.css";

import * as axios from "axios";
import * as moment from "moment";
import RequestService from "./services/request-service";

import Navigation from "./components/navigation/Navigation";
import LoginForm from "./components/login/login-form";
import GeneralPage from "./pages/GeneralPage";
import TopicPage from "./pages/TopicPage";
import CatergoryPage from "./pages/CategoryPage";
import SettingPage from "./pages/SettingPage";

import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";

import ArticleDataConvert from "./services/ArticleDataConvert";

const request = new RequestService();

class App extends Component {
  constructor(props) {
    super(props);

    // The state of the app. Changes what the user sees and includes code needed to access certain pages.
    this.state = {
      currentPage: 0,
      pages: [<div />, <div />, <div />, <div />],
      lastUpdated: "1-1-2000 00:00:00",
      pinCode: "",
      apiKey: "",
      loggedIn: false,
      rawArticles: [],
      filteredArticles: [],
      tableData: [],
      blacklistItems: [],
      updateDisabled: true
    };
  }

  // Sets the current page
  setPage = newPage => {
    if (this.state.currentPage === newPage) return;

    this.state.currentPage = newPage;
    this.setState(this.state);
  };

  // Adds a number to the pincode if below 4 and if 4 it sends to check if it's the correct code
  addPin = async value => {
    const state = this.state;
    if (state.pinCode.length < 4) {
      state.pinCode += value;
      if (state.pinCode.length === 4) {
        this.checkLogin(state);
      }
    }
    this.setState(state);
  };

  onTopicBlacklistChanged = items => {
    request.post("/blacklist", { items: items });

    this.blacklistItems = items;
    this.applyBlacklist();
    this.createPageFormats();
    this.setPages();
    this.setState(this.state);

    return items;
  };

  FiltertTableData = (data, blacklistedItems) => {
    let filteredData = [];
    try {
      filteredData = data.filter(d => {
        if (blacklistedItems.indexOf(d.name) >= 0) {
          return false;
        }
        return true;
      });
      return filteredData;
    } catch (error) {
      console.log(error);
    }
  };

  // Checks wheter login should succeed or not
  checkLogin = async () => {
    try {
      axios.defaults.headers = {
        "x-pincode": this.state.pinCode
      };
      let response = await request.post("/login", {});
      this.state.apiKey = response.data.apiKey;
      this.state.loggedIn = true;

      axios.defaults.headers = { "x-api-key": response.data.apiKey };

      this.state.lastUpdated = moment
        .unix(response.data.lastUpdated)
        .local()
        .format("DD-MM-YYYY HH:mm:ss");

      this.setDisableButton(response.data.lastUpdated);

      await this.getArticles();
      await this.getBlacklistItems();
      this.applyBlacklist();
      this.createPageFormats();
      this.setPages();
    } catch (error) {
      const form = document.getElementById("login-form");
      form.classList.add("login-shake");
      await new Promise(resolve => setTimeout(resolve, 700));
      form.classList.remove("login-shake");
      this.state.pinCode = "";
    }
    this.setState(this.state);
  };

  getArticles = async () => {
    // TODO: IMPLEMENT BACKEND AGAIN
    this.state.rawArticles = await require("./articles");
  };

  getBlacklistItems = async () => {
    this.state.blacklistItems = (await request.get("/blacklist")).data.items;
  };

  applyBlacklist = () => {
    this.state.filteredArticles = this.state.rawArticles.map(article => {
      article.topics = article.topics.filter(topic => {
        if (this.state.blacklistItems.indexOf(topic.name) >= 0) {
          return false;
        }
        return true;
      });
      article.categories = article.categories.filter(categorie => {
        if (this.state.blacklistItems.indexOf(categorie.name) >= 0) {
          return false;
        }
        return true;
      });
      return article;
    });
  };

  createPageFormats = () => {
    const converter = new ArticleDataConvert(this.state.filteredArticles);

    this.state.tableData[0] = converter.ConvertArticlesToGeneral(); // GENERAL
    this.state.tableData[1] = converter.ConvertArticlesToTopics(); // TOPICS
    this.state.tableData[2] = converter.ConvertArticlesToCategories(); // CATEGORIES
  };

  setPages = () => {
    this.state.pages = [
      <GeneralPage generalData={this.state.tableData[0]} />,
      <TopicPage topicData={this.state.tableData[1]} />,
      <CatergoryPage categoryData={this.state.tableData[2]} />,
      <SettingPage
        onTopicBlacklistChanged={this.onTopicBlacklistChanged}
        items={this.state.blacklistItems}
      />
    ];
  };

  // Remove last pincode number input
  removePin = () => {
    if (this.state.pinCode.length >= 4) return;

    this.state.pinCode = this.state.pinCode.substring(
      0,
      this.state.pinCode.length - 1
    );
    this.setState(this.state);
  };

  getApiKey = () => {
    return this.state.apiKey;
  };

  setApiKey = async value => {
    this.state.apiKey = value;
    this.setState(this.state);
  };

  setTimestamp = unix => {
    const date = moment
      .unix(unix)
      .local()
      .format("DD-MM-YYYY HH:mm:ss");
    this.state.lastUpdated = date;
    this.setDisableButton(unix);
    this.setState(this.state);
  };

  setDisableButton = unix => {
    if (
      moment.unix(unix).isBefore(
        moment()
          .clone()
          .add(-30, "m")
      )
    ) {
      // Can update
      this.state.updateDisabled = false;
    } else {
      // Can't update
      this.state.updateDisabled = true;
    }
    this.setState(this.state);
  };

  render() {
    return (
      <div id="app">
        <Navigation
          getApiKey={this.getApiKey}
          setPage={this.setPage}
          currentPage={this.state.currentPage}
          lastUpdated={this.state.lastUpdated}
          setTimestamp={this.setTimestamp}
          setDisableButton={this.setDisableButton}
          updateDisabled={this.state.updateDisabled}
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
