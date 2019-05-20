import React from "react";

import "./GeneralPage.css";

import HotCard from "../components/cards/HotCard";
import AnalyzedCard from "../components/cards/AnalyzedCard";

const GeneralPage = props => {
  return (
    <div id="general-page-grid">
      <div className="general-page-item" id="general-page-pie">
        <AnalyzedCard />
      </div>
      <div className="general-page-item general-page-hot">
        <HotCard
          top={true}
          iconColor="#FF5722"
          type="Category"
          results={35}
          text="Science and Technology>Social"
        />
      </div>
      <div className="general-page-item general-page-hot">
        <HotCard
          top={true}
          iconColor="#2DFB98"
          type="Topic"
          results={14}
          text="Open Housing"
        />
      </div>
      <div className="general-page-item general-page-hot">
        <HotCard
          top={true}
          iconColor="#4BD33F"
          type="Category"
          results={62}
          text="Science and Technology>Environment"
        />
      </div>
      <div className="general-page-item general-page-hot">
        <HotCard
          top={true}
          iconColor="#CF19ED"
          type="Topic"
          results={49}
          text="Open Housing"
        />
      </div>
      <div className="general-page-item" id="general-page-graph">
        <AnalyzedCard /> {/* SHOULD BE ANOTHER CARD */}
      </div>
    </div>
    // <Grid className="grid-container" container spacing={16}>
    //   <Grid className="grid-item" item xs={6}>
    //     <div className="test" />
    //   </Grid>
    //   <Grid className="grid-item" item xs={3}>
    //     <HotCard
    //       top={true}
    //       iconColor="#FF5722"
    //       type="Topic"
    //       results={32}
    //       text="Open Housing"
    //     />
    //     <HotCard
    //       top={false}
    //       iconColor="#4BD33F"
    //       type="Topic"
    //       results={32}
    //       text="Open Housing"
    //     />
    //   </Grid>
    //   <Grid className="grid-item" item xs={3}>
    //     <HotCard
    //       top={true}
    //       iconColor="#2DFB98"
    //       type="Category"
    //       results={32}
    //       text="Science and Technology>Social"
    //     />
    //     <HotCard
    //       top={false}
    //       iconColor="#CF19ED"
    //       type="Category"
    //       results={32}
    //       text="Science and Technology>Environment"
    //     />
    //   </Grid>
    //   <Grid className="grid-item" item xs={12}>
    //     <div className="test" />
    //   </Grid>
    // </Grid>
  );
};

export default GeneralPage;
