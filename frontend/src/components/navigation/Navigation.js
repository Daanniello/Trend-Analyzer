import React from "react";
import "./Navigation.css";

import NavigationHeader from "./NavigationHeader";
import NavigationItem from "./NavigationItem";
import NavigationFooter from "./NavigationFooter";

import PieChart from "@material-ui/icons/PieChart";
import TableChart from "@material-ui/icons/TableChart";
import ShowChart from "@material-ui/icons/ShowChart";
import Settings from "@material-ui/icons/Settings";

const Navigation = props => {
  const items = [
    {
      text: "General",
      icon: <PieChart />
    },
    {
      text: "Topic",
      icon: <TableChart />
    },
    {
      text: "Categories",
      icon: <ShowChart />
    },
    {
      text: "Settings",
      icon: <Settings />
    }
  ];

  let navItems = [];
  items.forEach((item, i) => {
    navItems[i] = (
      <div key={i} onClick={() => props.setPage(i)}>
        <NavigationItem
          active={props.currentPage === i}
          text={item.text}
          icon={item.icon}
        />
      </div>
    );
  });

  return (
    <div id="navigation">
      <NavigationHeader />
      {navItems}
      <NavigationFooter
        getApiKey={props.getApiKey}
        lastUpdated={props.lastUpdated}
      />
    </div>
  );
};

export default Navigation;
