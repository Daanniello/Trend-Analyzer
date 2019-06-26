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
import ArticlePage from "./pages/ArticlePage";

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
      pages: [<div />, <div />, <div />, <div />, <div />],
      lastUpdated: "1-1-2000 00:00:00",
      pinCode: "",
      errorMsg: "",
      apiKey: "",
      loggedIn: false,
      displayEmailInput: false,
      rawArticles: [],
      filteredArticles: [],
      tableData: [],
      blacklistItems: [],
      updateDisabled: true,
      pageColor: "#551F5C",
      allowedProviders: ["CorporatieNL", "Aedes"],
      emailOnly: false
    };
    document.addEventListener("keydown", this.keyHandler, true);
  }

  // Lets user use the keyboard for pincode input.
  keyHandler = event => {
    const { key } = event;
    if (key === "Backspace") this.removePin();
    if (isNaN(key)) return;
    const number = +key;
    this.addPin(number);
  };

  // Sets the current page
  setPage = newPage => {
    if (this.state.currentPage === newPage) return;
    const state = this.state;
    state.currentPage = newPage;
    this.setState(state);
  };

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

  onPageChange = color => {
    const state = this.state;
    state.pageColor = color;
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

  // Show email email input and send button, disable keyboard pincode number input
  toggleDisplayEmailInput = () => {
    const state = this.state;
    if (state.displayEmailInput === false) {
      state.displayEmailInput = true;
      document.removeEventListener("keydown", this.keyHandler, true);
    } else {
      state.displayEmailInput = false;
      document.addEventListener("keydown", this.keyHandler, true);
    }
    this.setState(state);
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

  shakeIt = async () => {
    const form = document.getElementById("login-form");
    form.classList.add("login-shake");
    await new Promise(resolve => setTimeout(resolve, 700));
    form.classList.remove("login-shake");
  };

  // Checks wheter login should succeed or not
  checkLogin = async () => {
    try {
      axios.defaults.headers = {
        "x-pincode": this.state.pinCode
      };
      let response = await request.post("/login", {});
      console.log("asd");
      this.state.apiKey = response.data.apiKey;

      axios.defaults.headers = { "x-api-key": response.data.apiKey };

      this.state.lastUpdated = moment
        .unix(response.data.lastUpdated)
        .local()
        .format("DD-MM-YYYY HH:mm:ss");

      this.setDisableButton(response.data.lastUpdated);

      await this.getArticles();
      await this.getBlacklistItems();

      this.applyFiltersAndUpdatePages();

      this.state.loggedIn = true;
    } catch (error) {
      this.state.errorMsg = error;
      this.shakeIt();
      this.state.pinCode = "";
    }
    this.setState(this.state);
  };

  applyFiltersAndUpdatePages = () => {
    this.state.filteredArticles = this.state.rawArticles;

    this.applyBlacklist();

    this.applyProviderFilter();

    this.applyEmailOnlyFilter();

    // TODO: create pages
    this.createPageFormats();
    this.setPages();

    this.setState(this.state);
  };

  // Send the mail via the backend, shake login when an error occures
  sendMail = async value => {
    try {
      const mail = value;
      if (mail === "") throw new Error();
      if (!this.validateEmail(mail)) throw new Error();
      axios.defaults.headers = {
        "x-email": mail
      };
      await request.post("/mail", {});
      const state = this.state;
      state.errorMsg = "E-mail sent!";
      this.setState(state);
      this.toggleDisplayEmailInput();
    } catch (error) {
      this.shakeIt();
      console.log(error);
    }
  };

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  getArticles = async () => {
    this.state.rawArticles = (await request.get("/articles")).data;
  };

  getBlacklistItems = async () => {
    this.state.blacklistItems = (await request.get("/blacklist")).data.items;
  };

  applyBlacklist = () => {
    const articles = JSON.parse(JSON.stringify(this.state.filteredArticles));
    this.state.filteredArticles = articles.map(article => {
      article.topics = article.topics.filter(topic => {
        if (this.state.blacklistItems.indexOf(topic.name.toLowerCase()) >= 0) {
          return false;
        }
        return true;
      });
      article.categories = article.categories.filter(categorie => {
        if (
          this.state.blacklistItems.indexOf(categorie.name.toLowerCase()) >= 0
        ) {
          return false;
        }
        return true;
      });
      return article;
    });
  };

  toggleProvider = provider => {
    const providerIndex = this.state.allowedProviders.indexOf(provider);
    if (providerIndex < 0) {
      this.state.allowedProviders.push(provider);
    } else {
      this.state.allowedProviders.splice(providerIndex, 1);
    }
    this.applyFiltersAndUpdatePages();
  };

  applyProviderFilter() {
    const articles = JSON.parse(JSON.stringify(this.state.filteredArticles));
    this.state.filteredArticles = articles.filter(article => {
      return this.state.allowedProviders.indexOf(article.provider) >= 0;
    });
    this.setState(this.state);
  }

  toggleEmailOnly = () => {
    this.state.emailOnly = !this.state.emailOnly;
    this.applyFiltersAndUpdatePages();
  };

  applyEmailOnlyFilter() {
    if (!this.state.emailOnly) return;
    const articles = JSON.parse(JSON.stringify(this.state.filteredArticles));
    this.state.filteredArticles = articles.filter(article => {
      if (!article.mailOccurrences) return false;
      return article.mailOccurrences.length > 0;
    });
  }

  createPageFormats = () => {
    const converter = new ArticleDataConvert(this.state.filteredArticles);

    this.state.tableData[0] = converter.ConvertArticlesToGeneral(); // GENERAL
    this.state.tableData[1] = converter.ConvertArticlesToTopics(); // TOPICS
    this.state.tableData[2] = converter.ConvertArticlesToCategories(); // CATEGORIES
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
    if (moment.unix(unix).isBefore(moment().add(-30, "m"))) {
      // Can update
      this.state.updateDisabled = false;
    } else {
      // Can't update
      this.state.updateDisabled = true;
    }
    this.setState(this.state);
  };

  setPages = () => {
    this.state.pages = [
      <GeneralPage
        generalData={this.state.tableData[0]}
        pageColor="#551F5C"
        onPageChange={this.onPageChange}
      />,
      <TopicPage
        topicData={this.state.tableData[1]}
        pageColor="#9FD714"
        onPageChange={this.onPageChange}
      />,
      <CatergoryPage
        categoryData={this.state.tableData[2]}
        pageColor="#FF8000"
        onPageChange={this.onPageChange}
      />,
      <ArticlePage
        articleData={this.state.filteredArticles}
        pageColor="#D24DFF"
        onPageChange={this.onPageChange}
      />,
      <SettingPage
        onTopicBlacklistChanged={this.onTopicBlacklistChanged}
        items={this.state.blacklistItems}
        pageColor="#9D000F"
        onPageChange={this.onPageChange}
        toggleProvider={provider => this.toggleProvider(provider)}
        toggleEmailOnly={() => this.toggleEmailOnly()}
        allowedProviders={this.state.allowedProviders}
        emailOnly={this.state.emailOnly}
        apiKey={this.state.apiKey}
      />
    ];
  };

  render() {
    return (
      <div id="app">
        <div
          style={{
            width: "100%",
            height: "4px",
            position: "absolute",
            zIndex: "1000"
          }}
        >
          <div
            style={{
              backgroundColor: "#9D000F",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
          <div
            style={{
              backgroundColor: "#1eabd8",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
          <div
            style={{
              backgroundColor: "#FF8000",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
          <div
            style={{
              backgroundColor: "#C19000",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
          <div
            style={{
              backgroundColor: "#cad212",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
          <div
            style={{
              backgroundColor: "#D24DFF",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
          <div
            style={{
              backgroundColor: "#1EABD7",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
          <div
            style={{
              backgroundColor: "#D80000",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
          <div
            style={{
              backgroundColor: "#003478",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
          <div
            style={{
              backgroundColor: "#8A8B8E",
              width: "10%",
              height: "100%",
              float: "left"
            }}
          />
        </div>
        <Navigation
          getApiKey={this.getApiKey}
          setPage={this.setPage}
          currentPage={this.state.currentPage}
          lastUpdated={this.state.lastUpdated}
          setTimestamp={this.setTimestamp}
          setDisableButton={this.setDisableButton}
          updateDisabled={this.state.updateDisabled}
          pageColor={this.state.pageColor}
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
