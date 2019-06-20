import React from "react";
import "./SettingPage.css";

import BlacklistCard from "../components/cards/BlacklistCard";
import Typography from "@material-ui/core/Typography";
import SwitchButton from "../components/Buttons/SwitchButton";
import SwitchButtonStandard from "../components/Buttons/SwitchButtonStandard";

import Button from "@material-ui/core/Button";
import * as axios from "axios";
import RequestService from "../services/request-service";

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

  render() {
    return (
      <div className="container">
        <div className="setting-header">
          <Typography style={{ color: "#551F5C" }} variant="h4">
            Settings
          </Typography>
          {/* <div className="settings-info">
            <Typography variant="caption">
              {" "}
              Companies: Aedes, CorporatieNL
            </Typography>
            <Typography variant="caption"> Date: 2019</Typography>
            <Typography variant="caption">
              {" "}
              Application version: 1.0.0
            </Typography>
          </div> */}
        </div>
        {/* <div className="settings-info">
          <Typography variant="caption">
            {" "}
            Companies: Aedes, CorporatieNL
          </Typography>
          <Typography variant="caption"> Date: 2019</Typography>
          <Typography variant="caption"> Application version: 1.0.0</Typography>
        </div> */}
        <BlacklistCard
          onTopicBlacklistChanged={this.props.onTopicBlacklistChanged}
          items={this.props.items}
          pageColor={this.props.pageColor}
        />
        <div className="settings-switches">
          <Typography variant="h6">Filter options</Typography>
          <SwitchButton
            name="CorporatieNL"
            color="#1EABD7"
            switchHandler={(provider, boolean) =>
              this.props.changeAllowedProviderHandler(provider, boolean)
            }
            allowedProviders={this.props.allowedProviders}
          />
          <SwitchButton
            name="Aedes"
            color="#FF8000"
            switchHandler={(provider, boolean) =>
              this.props.changeAllowedProviderHandler(provider, boolean)
            }
            allowedProviders={this.props.allowedProviders}
          />
          <SwitchButtonStandard
            name="E-mails only"
            color="#D24DFF"
            switchHandler={() => this.props.applyEmailOnlyFilter()}
            emailOnly={this.props.emailOnly}
          />
        </div>
        <div id="new-pincode">
          <Button variant="contained" size="small" onClick={this.setPincode}>
            Create new pincode
          </Button>

          {(() => {
            // If there is a new pincode, show it
            if (!!String(this.state.newPin).trim()) {
              return (
                <Typography>
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
