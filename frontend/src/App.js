import React from "react";
import { Component } from "react";
import "./App.css";

import Navigation from "./components/navigation/Navigation";

import GeneralPage from "./pages/GeneralPage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      pages: [<GeneralPage />, <div />, <div />],
      lastUpdated: "16-05-2019 15:00"
    };

    this.setPage = newPage => {
      if (this.state.currentPage === newPage) return;
      const state = this.state;
      state.currentPage = newPage;
      this.setState(state);
      console.log(this.state.currentPage);
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
        <div id="page-content">{this.state.pages[this.state.currentPage]}</div>
      </div>
    );
  }
}

export default App;
