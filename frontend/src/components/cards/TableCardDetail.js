import React from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import "./TableCard.css";

import MenuIcon from "@material-ui/icons/Menu";

const articles = ["article One", "Article Two"];

function TableCardDetails(props) {
  // console.log(props);
  const { onClose, selectedValue, ...other } = props;
  function handleClose() {
    onClose(selectedValue);
  }

  const detailsObjects = [];
  props.details.forEach((article, index) => {
    detailsObjects.push(
      <ListItem button component="a" href={article.url} target="_blank">
        <ListItemText primary={article.title} />
      </ListItem>
    );
  });

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      {...other}
    >
      <DialogTitle id="simple-dialog-title">Articles</DialogTitle>
      <List>{detailsObjects}</List>
    </Dialog>
  );
}

function TableDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(articles[1]);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div Style="height:10px">
      <MenuIcon
        style={{ color: props.color, "font-size": "20px" }}
        color="inherit"
        onClick={handleClickOpen}
      />
      {/* <div className="DetailButton" onClick={handleClickOpen}>
        <div
          Style={
            "border-radius: 2px;  width: 60%; height: 15%; background-color:" +
            props.color
          }
        />
        <div
          Style={
            "border-radius: 2px;  width: 60%; height: 15%; margin-top:2px; background-color:" +
            props.color
          }
        />
        <div
          Style={
            "border-radius: 2px; width: 60%; height: 15%; margin-top:2px; background-color:" +
            props.color
          }
        />
        <div
          Style={
            "border-radius: 2px; width: 60%; height: 15%; margin-top:2px; background-color:" +
            props.color
          }
        />
      </div> */}
      <TableCardDetails
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        details={props.details}
      />
    </div>
  );
}

export default TableDetails;
