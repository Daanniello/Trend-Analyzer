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
      customTrends: [],
      customTrendsTopics: [],
      customTrendsCategories: [],
      filteredArticles: [],
      tableData: [],
      blacklistItems: [],
      updateDisabled: true,
      pageColor: "#551F5C",
      allowedProviders: ["CorporatieNL", "Aedes"],
      emailOnly: false,
      keywords: []
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
    const state = this.state;
    if (state.currentPage === newPage) return;
    state.currentPage = newPage;
    this.setState(state);
  };

  // Ads a pin number to the pincode
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

  onCustomTrendsChanged = items => {
    let changedItems = "";
    changedItems = this.state.customTrends.filter(item => {
      if (items.includes(item.name)) {
        return false;
      } else {
        return true;
      }
    });

    let changedItem = changedItems[changedItems.length - 1];

    const state = this.state;
    state.customTrends.splice(
      state.customTrends.findIndex(item => {
        return item.name === changedItem.name;
      }),
      1
    );
    this.setState(state);

    this.getCustomTrendsCategory();
    this.getCustomTrendsTopic();
    this.applyFiltersAndUpdatePages();
    request.delete("/customtrends", changedItem);
  };

  onTopicBlacklistChanged = items => {
    request.post("/blacklist", { items: items });
    const state = this.state;
    state.blacklistItems = items;
    this.setState(state);
    this.applyFiltersAndUpdatePages();
  };

  onKeywordsChanged = items => {
    const state = this.state;
    state.keywords = items;
    this.setState(state);
    this.applyFiltersAndUpdatePages();
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

  // Method that shakes the screen, indicator of an error
  shakeIt = async () => {
    const form = document.getElementById("login-form");
    form.classList.add("login-shake");
    await new Promise(resolve => setTimeout(resolve, 700));
    form.classList.remove("login-shake");
  };

  insertCustomTrendsFrontEnd = trend => {
    const customTrendsTemp = this.state.customTrends;
    customTrendsTemp.push(trend);

    const state = this.state;
    state.customTrends = customTrendsTemp;
    this.setState(state);
    this.getCustomTrendsTopic();
    this.getCustomTrendsCategory();
    this.applyFiltersAndUpdatePages();
  };

  // Checks wheter login should succeed or not
  checkLogin = async () => {
    try {
      axios.defaults.headers = {
        "x-pincode": this.state.pinCode
      };
      let response = await request.post("/login", {});

      this.state.apiKey = response.data.apiKey;

      axios.defaults.headers = { "x-api-key": response.data.apiKey };

      this.state.lastUpdated = moment
        .unix(response.data.lastUpdated)
        .local()
        .format("DD-MM-YYYY HH:mm:ss");

      this.setDisableButton(response.data.lastUpdated);

      await this.getArticles(response.data.lastUpdated);
      await this.getBlacklistItems();
      await this.getCustomTrends();

      this.applyFiltersAndUpdatePages();

      this.state.loggedIn = true;
    } catch (error) {
      console.log(error);
      this.state.errorMsg = error;
      this.shakeIt();
      this.state.pinCode = "";
    }
    this.setState(this.state);
  };

  applyFiltersAndUpdatePages = () => {
    const state = this.state;

    // Loop that applies filters
    const articles = JSON.parse(JSON.stringify(state.rawArticles));
    state.filteredArticles = articles.filter(article => {
      // Apply emailOnly filter
      if (!this.isEmailArticle(article.mailOccurrences)) return false;

      // Apply keyword filter
      if (!this.containsKeyword(article.title)) return false;

      // Apply provider filter
      if (!this.isAllowedProvider(article.provider)) return false;

      // Check if the blacklist filter is even necessary
      if (!state.blacklistItems.length > 0) return true;

      // Filter the blacklist over the topics
      article.topics = article.topics.filter(topic => {
        if (state.blacklistItems.indexOf(topic.name.toLowerCase()) >= 0) {
          return false;
        }
        return true;
      });

      // Filter the blacklist over the categories
      article.categories = article.categories.filter(categorie => {
        if (state.blacklistItems.indexOf(categorie.name.toLowerCase()) >= 0) {
          return false;
        }
        return true;
      });

      return article;
    });

    state.tableData = this.createPageFormats();
    //state.pages = this.setPages(state);
    this.setPages();

    this.setState(state);
  };

  containsKeyword = title => {
    const keywords = this.state.keywords;
    if (keywords.length <= 0) return true;
    for (const keyword of keywords) {
      if (title.toLowerCase().includes(keyword.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  isEmailArticle = mailOccurrences => {
    if (!this.state.emailOnly) return true;
    if (!mailOccurrences) return false;
    return mailOccurrences.length > 0;
  };

  isAllowedProvider = provider => {
    return this.state.allowedProviders.indexOf(provider) >= 0;
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

  // Use regex to check if the input is a valid input
  validateEmail(email) {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  getArticles = async lastUpdate => {
    const storedUpdate = localStorage.getItem("updatedAt");

    if (!storedUpdate) {
      await this.updateRawArticles();
      return;
    }

    const lastMoment = moment.unix(lastUpdate);
    const storedMoment = moment.unix(storedUpdate);
    if (lastMoment.isAfter(storedMoment)) {
      await this.updateRawArticles();
      return;
    }

    this.state.rawArticles = JSON.parse(localStorage.getItem("rawArticles")); // (await request.get("/articles")).data;

    if (!this.state.rawArticles) {
      await this.updateRawArticles();
    }
  };

  updateRawArticles = async () => {
    this.state.rawArticles = (await request.get("/articles")).data;
    localStorage.setItem(
      "updatedAt",
      moment()
        .unix()
        .toString()
    );
    localStorage.setItem("rawArticles", JSON.stringify(this.state.rawArticles));
  };

  getCustomTrends = async () => {
    let customTrends = await request.get("/customtrends");

    const state = this.state;

    state.customTrends = customTrends.data;
    this.setState(state);
    this.getCustomTrendsTopic();
    this.getCustomTrendsCategory();
  };

  getCustomTrendsTopic = () => {
    const state = this.state;
    state.customTrendsTopics = this.state.customTrends.filter(trend => {
      return trend.type === "Topic";
    });
    this.setState(state);
  };

  getCustomTrendsCategory = () => {
    const state = this.state;
    state.customTrendsCategories = this.state.customTrends.filter(trend => {
      return trend.type === "Category";
    });
    this.setState(state);
  };

  getBlacklistItems = async () => {
    this.state.blacklistItems = (await request.get("/blacklist")).data.items;
  };

  toggleEmailOnly = () => {
    const state = this.state;
    state.emailOnly = !state.emailOnly;
    this.setState(state);
    this.applyFiltersAndUpdatePages();
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

  createPageFormats = () => {
    const converter = new ArticleDataConvert(this.state.filteredArticles);
    const tableData = [];
    tableData[0] = converter.ConvertArticlesToGeneral(); // GENERAL
    tableData[1] = converter.ConvertArticlesToTopics(); // TOPICS
    tableData[2] = converter.ConvertArticlesToCategories(); // CATEGORIES
    return tableData;
  };

  // Remove last pincode number input
  removePin = () => {
    const state = this.state;
    if (state.pinCode.length >= 4) return;

    state.pinCode = state.pinCode.substring(0, state.pinCode.length - 1);
    this.setState(state);
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
    const state = this.state;
    state.lastUpdated = date;
    this.setDisableButton(unix);
    this.setState(state);
  };

  setDisableButton = unix => {
    const state = this.state;
    if (moment.unix(unix).isBefore(moment().add(-30, "m"))) {
      // Can update
      state.updateDisabled = false;
    } else {
      // Can't update
      state.updateDisabled = true;
    }
    this.setState(state);
  };

  setPages = () => {
    const state = this.state;
    state.pages = [
      <GeneralPage
        generalData={state.tableData[0]}
        pageColor="#551F5C"
        onPageChange={this.onPageChange}
      />,
      <TopicPage
        topicData={state.tableData[1]}
        pageColor="#9FD714"
        onPageChange={this.onPageChange}
        customTrendsTopics={this.state.customTrendsTopics}
        insertCustomTrendsFrontEnd={trend =>
          this.insertCustomTrendsFrontEnd(trend)
        }
      />,
      <CatergoryPage
        categoryData={state.tableData[2]}
        pageColor="#FF8000"
        onPageChange={this.onPageChange}
        customTrendsCategories={this.state.customTrendsCategories}
        insertCustomTrendsFrontEnd={trend =>
          this.insertCustomTrendsFrontEnd(trend)
        }
      />,
      <ArticlePage
        articleData={this.state.filteredArticles}
        pageColor="#D24DFF"
        onPageChange={this.onPageChange}
      />,
      <SettingPage
        onTopicBlacklistChanged={this.onTopicBlacklistChanged}
        onKeywordsChanged={this.onKeywordsChanged}
        blacklistItems={state.blacklistItems}
        keywords={state.keywords}
        pageColor="#9D000F"
        onPageChange={this.onPageChange}
        toggleProvider={(provider, boolean) =>
          this.toggleProvider(provider, boolean)
        }
        toggleEmailOnly={() => this.toggleEmailOnly()}
        allowedProviders={state.allowedProviders}
        emailOnly={state.emailOnly}
        apiKey={state.apiKey}
        customTrends={this.state.customTrends}
        onCustomTrendsChanged={items => this.onCustomTrendsChanged(items)}
      />
    ];
    this.setState(state);
  };

  render() {
    return (
      <div id="app">
        <div
          style={{
            width: "100%",
            height: "2px",
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
