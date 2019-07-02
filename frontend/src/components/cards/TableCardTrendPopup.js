import React, { useState } from "react";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import "./TableCard.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RequestService from "../../services/request-service";
import SimpleTextfield from "../fields/SimpleTextfield";

const articles = ["article One", "Article Two"];

function TableCardTrendPopupMain(props) {
  const { onClose, selectedValue, ...other } = props;
  const [searchbarContent, setSearchbarContent] = useState("");

  function handleInputChange(e) {
    setSearchbarContent(e.target.value);

    //state.showData = this.getFilteredDataFromSearch();
  }

  function handleClose() {
    onClose(selectedValue);
  }

  function onButtonClick() {
    let trend = {
      name: `${searchbarContent} *`,
      trends: [],
      type: props.type
    };
    for (let i = 0; i < props.items.length; i++) {
      const name = props.alldata[props.items[i]].name;
      const customTrend = props.customtrends.find(ct => ct.name === name);
      if (customTrend) {
        for (const t of customTrend.trends) {
          if (trend.trends.indexOf(t) < 0) {
            trend.trends.push(t);
          }
        }
        continue;
      }

      trend.trends.push(name);
    }
    const request = new RequestService();
    request.post("/customtrends", trend);

    handleClose();
    props.inserttrendsdirectly(trend);
  }

  function SelectedItems() {
    let selectedItems = [];
    for (let i = 0; i < props.items.length; i++) {
      selectedItems.push(
        <Typography key={`selected-${i}`}>
          {props.alldata[props.items[i]].name}
        </Typography>
      );
    }

    return selectedItems;
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      {...other}
    >
      <DialogTitle id="simple-dialog-title">Combine selected items</DialogTitle>
      <div style={{ width: "auto", margin: "0 auto" }}>
        <SimpleTextfield placeholder="Add a name" onInput={handleInputChange} />
      </div>
      <div style={{ margin: "16px" }}>
        <Typography variant="h5">Selected items:</Typography>
        <List>{SelectedItems()}</List>
      </div>
      <Button
        variant="outlined"
        style={{ float: "right", marginTop: "16px" }}
        onClick={onButtonClick}
      >
        Create Trend
      </Button>
    </Dialog>
  );
}

function TableCardTrendPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(articles[1]);
  let button = (
    <Button
      variant="outlined"
      onClick={handleClickOpen}
      style={{ float: "right", marginTop: "36px" }}
    >
      {" "}
      Combine topics
    </Button>
  );

  if (props.disabled) {
    button = (
      <Button
        disabled
        variant="outlined"
        onClick={handleClickOpen}
        style={{ float: "right", marginTop: "36px" }}
      >
        {" "}
        Combine topics
      </Button>
    );
  }

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Typography style={{ height: "10px" }}>
      {button}
      <TableCardTrendPopupMain
        selectedValue={selectedValue}
        open={open}
        type={props.type}
        onClose={handleClose}
        details={props.details}
        items={props.items}
        alldata={props.allData}
        customtrends={props.customTrends}
        inserttrendsdirectly={trends => props.insertTrendDirectly(trends)}
      />
    </Typography>
  );
}

export default TableCardTrendPopup;
