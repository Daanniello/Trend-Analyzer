import React from "react";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import "./TableCard.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SearchBar from "../fields/SearchBar";

const articles = ["article One", "Article Two"];

function TableCardTrendPopupMain(props) {
  const { onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  function SelectedItems() {
    let selectedItems = [];

    for (let i = 0; i < props.items.length; i++) {
      selectedItems.push(<Typography>{props.allData[i].name}</Typography>);
    }
    console.log(selectedItems);
    return selectedItems;
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      {...other}
    >
      <DialogTitle id="simple-dialog-title">Combine selected items</DialogTitle>
      <div style={{ textAlign: "center" }}>
        <SearchBar />
      </div>
      <div style={{ margin: "16px" }}>
        <Typography variant="h5">Selected items:</Typography>
        <List>{SelectedItems()}</List>
      </div>
    </Dialog>
  );
}

function TableCardTrendPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(articles[1]);

  function handleClickOpen() {
    setOpen(true);
    console.log(props.items);
  }

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Typography style={{ height: "10px" }}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ float: "right", marginTop: "36px" }}
      >
        Combine topics
      </Button>
      <TableCardTrendPopupMain
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        details={props.details}
        items={props.items}
        allData={props.allData}
      />
    </Typography>
  );
}

export default TableCardTrendPopup;
