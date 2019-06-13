import React from "react";
import "./SettingPage.css";

import BlacklistCard from "../components/cards/BlacklistCard";
import Typography from "@material-ui/core/Typography";

class SettingPage extends React.Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="setting-header">
          <Typography style={{ color: "#551F5C" }} variant="h4">
            Settings
          </Typography>

          <div className="settings-info">
            <Typography variant="caption">
              {" "}
              Companies: Aedes, CorporatieNL
            </Typography>
            <Typography variant="caption"> Date: 2019</Typography>
            <Typography variant="caption">
              {" "}
              Application version: 1.0.0
            </Typography>
          </div>
        </div>
        <BlacklistCard />
      </div>
    );
  }
}

export default SettingPage;
