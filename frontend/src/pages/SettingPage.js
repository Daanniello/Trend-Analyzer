import React from "react";
import "./SettingPage.css";

import BlacklistCard from "../components/cards/BlacklistCard";
import Typography from "@material-ui/core/Typography";
import SwitchButton from "../components/Buttons/SwitchButton";
import SwitchButtonStandard from "../components/Buttons/SwitchButtonStandard";

class SettingPage extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    props.onPageChange(props.pageColor);
  }

  render() {
    return (
      <div className="container">
        <div className="setting-header">
          <Typography style={{ color: "#551F5C" }} variant="h4">
            Settings
          </Typography>
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
      </div>
    );
  }
}

export default SettingPage;
