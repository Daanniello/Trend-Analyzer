import React from "react";
import "./SettingPage.css";

import Typography from "@material-ui/core/Typography";
import SwitchButton from "../components/Buttons/SwitchButton";
import SwitchButtonStandard from "../components/Buttons/SwitchButtonStandard";

import Button from "@material-ui/core/Button";
import * as axios from "axios";
import RequestService from "../services/request-service";
import SettingsList from "../components/cards/SettingsList";

const request = new RequestService();

class SettingPage extends React.Component {
  state = {};
  constructor(props) {
    super(props);

    this.state = {
      newPin: ""
    };

    props.onPageChange(props.pageColor);
  }

  // Create new pincode and set it to the backend to update in the database
  setPincode = async () => {
    try {
      axios.defaults.headers = {
        "x-api-key": this.props.apiKey,
        "x-new-pincode": String(this.getRndInteger(1000, 9999))
      };
      try {
        let response = await request.post("/pincode", {});
        this.state.newPin = response.data;

        this.setState(this.state);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createCustomTrendsNameList = () => {
    const trendNames = [];
    for (let i = 0; i < this.props.customTrends.length; i++) {
      trendNames.push(this.props.customTrends[i].name);
    }
    return trendNames;
  };

  render() {
    console.log();
    console.log(this.props.keywords);
    console.log(this.props.blacklistItems);
    return (
      <div>
        <div className="setting-header">
          <Typography style={{ color: "#551F5C" }} variant="h4">
            Settings
          </Typography>
        </div>
        <SettingsList
          title="Keywords"
          items={this.props.keywords}
          onItemsChanged={this.props.onKeywordsChanged}
          pageColor={this.props.pageColor}
        />
        <SettingsList
          title="Blacklist"
          items={this.props.blacklistItems}
          onItemsChanged={this.props.onTopicBlacklistChanged}
          pageColor={this.props.pageColor}
        />
        <SettingsList
          title="Custom Trends"
          items={this.createCustomTrendsNameList()}
          onItemsChanged={this.props.onCustomTrendsChanged}
          pageColor={this.props.pageColor}
        />
        <div className="settings-switches">
          <Typography variant="h6">Filter options</Typography>
          <SwitchButton
            name="CorporatieNL"
            color="rgb(157, 0, 15)"
            switchHandler={provider => this.props.toggleProvider(provider)}
            allowedProviders={this.props.allowedProviders}
          />
          <SwitchButton
            name="Aedes"
            color="rgb(157, 0, 15)"
            switchHandler={provider => this.props.toggleProvider(provider)}
            allowedProviders={this.props.allowedProviders}
          />
          <SwitchButtonStandard
            name="E-mails only"
            color="rgb(157, 0, 15)"
            switchHandler={() => this.props.toggleEmailOnly()}
            emailOnly={this.props.emailOnly}
          />
        </div>
        <div id="new-pincode">
          <Button
            style={{ float: "left" }}
            variant="contained"
            size="small"
            onClick={this.setPincode}
          >
            Create new pincode
          </Button>

          {(() => {
            // If there is a new pincode, show it
            if (!!String(this.state.newPin).trim()) {
              return (
                <Typography style={{ float: "left", padding: "6px" }}>
                  The new pincode is: <b>{this.state.newPin}</b>
                </Typography>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

export default SettingPage;
