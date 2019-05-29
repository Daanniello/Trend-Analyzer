import React from "react";
import { Component } from "react";
import "./GraphCard.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import DialogPicker from "../fields/DatePicker";

var Chart = require("chart.js");

const styles = theme => ({
  root: {
    margin: 0
  },
  closeButton: {
    position: "absolute",
    float: "right",
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({}))(MuiDialogActions);

class GraphCard extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  constructor(props) {
    super(props);
    this.loadChart = () => {
      console.log(1);
      var ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              data: [86, 114, 106, 106, 300, 111, 133, 221, 783, 400, 450, 300],
              label: "Solar panel",
              borderColor: "#C19000",
              backgroundColor: "#C19000",
              fill: false
            },
            {
              data: [86, 114, 106, 30, 17, 203, 40, 20, 100, 800, 820, 800],
              label: "Data mining",
              borderColor: "#12D4FF",
              backgroundColor: "#12D4FF",
              fill: false
            }
          ]
        },

        // Configuration options go here
        options: {
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    };
  }

  componentDidMount() {
    this.loadChart();
  }

  render() {
    return (
      <div className="graph-card">
        <div className="chart-button" Style="margin-left: 45px ">
          All
        </div>
        <div className="chart-button" Style="margin-left: 90px ">
          Yearly
        </div>
        <div className="chart-button" Style="margin-left: 160px ">
          Monthly
        </div>
        <div className="chart-button" Style="margin-left: 245px ">
          Weekly
        </div>
        <div
          className="chart-button"
          Style="margin-left: 318px "
          onClick={this.handleClickOpen}
        >
          Custom
        </div>
        <canvas id="myChart" width="800" height="200" />
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Custom Date
          </DialogTitle>
          <DialogContent dividers>
            <DialogPicker title="Start Date" />
            <DialogPicker title="Begin Date" />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default GraphCard;
