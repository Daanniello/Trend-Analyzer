import React from "react";

import "./GeneralPage.css";

import Typography from "@material-ui/core/Typography";
import HotCard from "../components/cards/HotCard";
import AnalyzedCard from "../components/cards/AnalyzedCard";
import LatestArticle from "../components/cards/LatestArticle";

const GeneralPage = props => {
  console.log(props.generalData);
  return (
    <div id="general-page-grid">
      <div className="general-page-item" id="general-page-header">
        <Typography style={{ color: "#551F5C" }} variant="h4">
          General
        </Typography>
      </div>
      <div className="general-page-item" id="general-page-pie">
        <AnalyzedCard providers={props.generalData.providers} />
      </div>
      <div className="general-page-item general-page-hot">
        <HotCard
          top={true}
          iconColor="#D24DFF"
          type="Category"
          unit="week"
          results={
            props.generalData.hot.category.week.length != false
              ? props.generalData.hot.category.week[0].amount
              : 0
          }
          text={
            props.generalData.hot.category.week.length != false
              ? props.generalData.hot.category.week[0].name
              : "No topic this week"
          }
        />
      </div>
      <div className="general-page-item general-page-hot">
        <HotCard
          top={true}
          iconColor="#D80000"
          type="Topic"
          unit="week"
          results={
            props.generalData.hot.topic.week.length != false
              ? props.generalData.hot.topic.week[0].amount
              : 0
          }
          text={
            props.generalData.hot.topic.week.length != false
              ? props.generalData.hot.topic.week[0].name
              : "No category this week"
          }
        />
      </div>
      <div className="general-page-item general-page-hot">
        <HotCard
          top={true}
          iconColor="#cad212"
          type="Category"
          unit="month"
          results={
            props.generalData.hot.category.month.length != false
              ? props.generalData.hot.category.month[0].amount
              : 0
          }
          text={
            props.generalData.hot.category.month.length != false
              ? props.generalData.hot.category.month[0].name
              : "No category this month"
          }
        />
      </div>
      <div className="general-page-item general-page-hot">
        <HotCard
          top={true}
          iconColor="#1EABD7"
          type="Topic"
          unit="month"
          results={
            props.generalData.hot.topic.month.length != false
              ? props.generalData.hot.topic.month[0].amount
              : 0
          }
          text={
            props.generalData.hot.category.month.length != false
              ? props.generalData.hot.topic.month[0].name
              : "No category this month"
          }
        />
      </div>
      {/* <div className="general-page-item" id="general-page-graph">
        <AnalyzedCard generalData={props.generalData} />
      </div> */}
      <div
        style={{
          height: "500px",
          float: "left",
          width: "100%"
        }}
      >
        <LatestArticle
          className="general-page-item"
          latestArticle={props.generalData.latestArticle[0][0]}
        />
        <LatestArticle
          className="general-page-item"
          latestArticle={props.generalData.latestArticle[1][0]}
        />
      </div>
    </div>
  );
};

export default GeneralPage;
