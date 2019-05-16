import React from "react";
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { PieChart, ShowChart, TableChart } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import "./Navigation.css";

const styles = (theme: {
  palette: { primary: { main: any }; common: { white: any } };
}) => ({
  menuItem: {
    "&:focus": {
      background: "rgba(98, 2, 238, .12)"
    },
    "&:hover": {
      background: "rgba(98, 2, 238, .12)"
    },

    borderRadius: 8,
    padding: "10px 10px 10px 10px",
    margin: "5px 10px 5px 10px"
  },
  primary: {},
  icon: {}
});

export interface Props {}

export interface State {}

class Navigation extends React.Component<any, any> {
  state = { value: 0 };

  handleClick = (value: number) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className="Container">
        <div className="Navigation">
          <div className="Navigation_logo" onClick={() => this.handleClick(0)}>
            <img alt="Kjenning Logo" src="https://i.imgur.com/rR63OPt.png" />
          </div>

          <MenuList>
            <MenuItem
              className={classes.menuItem}
              onClick={() => this.handleClick(0)}
            >
              <ListItemIcon className={classes.icon}>
                <PieChart />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="General"
              />
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => this.handleClick(1)}
            >
              <ListItemIcon className={classes.icon}>
                <TableChart />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Topics"
              />
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => this.handleClick(2)}
            >
              <ListItemIcon className={classes.icon}>
                <ShowChart />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Categorizations"
              />
            </MenuItem>
          </MenuList>
        </div>
        <div className="SinglePages">
          {value === 0 && <div className="SinglePage">Item One</div>}
          {value === 1 && <div className="SinglePage">Item Two</div>}
          {value === 2 && <div className="SinglePage">Item Three</div>}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
