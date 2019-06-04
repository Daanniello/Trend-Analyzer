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
import * as moment from "moment";

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
    open: false,
    topics: [],
    labels: [],
    chart: null,
    DateFormat: "MMMM",
    beginDate: "05-05-2019",
    endDate: "05-05-2019"
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    const state = this.state;
    state.open = false;
    this.setState(state);
    // CHECK IF LEGIT DATE
    this.labels_custom();
  };

  setBeginDate = beginDate => {
    const state = this.state;
    state.beginDate = beginDate;
    this.setState(state);
    console.log(beginDate + "begin");
  };
  setEndDate = endDate => {
    const state = this.state;
    state.endDate = endDate;
    this.setState(state);
    console.log(endDate + "end");
  };

  constructor(props) {
    super(props);

    let topics = require("./topics");

    this.calculateData = () => {
      const datasets = [];

      for (const topic of this.state.topics) {
        const dataset = {
          data: [],
          label: topic.name,
          borderColor: topic.color,
          fill: false
        };
        for (const label of this.state.labels) {
          dataset.data.push(0);
        }
        for (const article of topic.articles) {
          const articleString = moment
            .unix(article.timestamp)
            .format(this.state.DateFormat);
          this.state.labels.forEach((label, index) => {
            if (articleString === label) {
              dataset.data[index] = ++dataset.data[index];
            }
          });
        }

        datasets.push(dataset);
      }
      return datasets;
    };

    this.loadChart = () => {
      const datasets = this.calculateData();
      var ctx = document.getElementById("myChart").getContext("2d");

      const state = this.state;
      if (!state.chart) {
        state.chart = new Chart(ctx, {
          // The type of chart we want to create
          type: "line",

          // The data for our dataset
          data: {
            labels: [],
            datasets: []
          },

          // Configuration options go here
          options: {
            legend: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
      state.chart.data.labels = this.state.labels;
      state.chart.data.datasets = datasets;
      console.log(datasets);
      state.chart.update();
      this.setState(state);
    };

    this.labels_custom = () => {
      var begin = moment(this.state.beginDate.replace("-", ""), "YYYYMMDD");
      var end = moment(this.state.endDate.replace("-", ""), "YYYYMMDD");

      if (
        end.diff(begin, "day") <= 0 ||
        begin.diff(moment.now(), "days") >= 0 ||
        end.diff(moment.now(), "days") >= 0
      ) {
        return;
      }

      var customCount = 0;
      var customFormat = "WW";
      var customType = "weeks";

      var dayCount = end.diff(begin, "day");
      var weekCount = end.diff(begin, "week");
      var monthCount = end.diff(begin, "month");
      var yearCount = end.diff(begin, "year");

      if (dayCount < 14) {
        customCount = dayCount;
        customFormat = "DD";
        customType = "days";
      }
      if (weekCount < 26 && weekCount >= 2) {
        customCount = weekCount;
        customFormat = "WW";
        customType = "weeks";
      }
      if (monthCount < 24 && monthCount >= 4) {
        customCount = monthCount;
        customFormat = "MM";
        customType = "months";
      }
      if (yearCount >= 2) {
        customCount = yearCount;
        customFormat = "YY";
        customType = "years";
      }

      const now = begin
        .subtract(customCount, customFormat)
        .subtract(1, customType);
      const weekly = [];

      for (let index = 0; index <= customCount; index++) {
        weekly[index] = now.add(1, customType).format(customFormat);
      }

      const state = this.state;
      state.labels = weekly;
      state.DateFormat = customFormat;
      this.setState(state);
      this.loadChart();
    };

    this.labels_weekly = () => {
      const now = moment().subtract(26, "W");
      const weekly = [];

      for (let index = 0; index < 26; index++) {
        weekly[index] = now.add(1, "W").format("WW");
      }
      const state = this.state;
      state.labels = weekly;
      state.DateFormat = "WW";
      this.setState(state);
      this.loadChart();
    };

    this.labels_monthly = () => {
      const now = moment().subtract(12, "M");
      const monthly = [];

      for (let index = 0; index < 12; index++) {
        monthly[index] = now.add(1, "M").format("MMMM");
      }
      const state = this.state;
      state.labels = monthly;
      state.DateFormat = "MMMM";
      this.setState(state);
      this.loadChart();
    };

    this.labels_yearly = () => {
      const now = moment().subtract(4, "Y");
      const yearly = [];

      for (let index = 0; index < 4; index++) {
        yearly[index] = now.add(1, "Y").format("YYYY");
      }
      const state = this.state;
      state.labels = yearly;
      state.DateFormat = "YYYY";
      this.setState(state);
      this.loadChart();
    };
  }

  componentDidMount() {
    this.loadChart();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const state = this.state;
      state.topics = nextProps.topics;
      this.setState(state);
      this.loadChart();
    }
  }

  render() {
    return (
      <div className="graph-card">
        <div
          className="chart-button"
          onClick={() => this.labels_yearly()}
          Style="margin-left: 45px "
        >
          Yearly
        </div>
        <div
          className="chart-button"
          onClick={() => this.labels_monthly()}
          Style="margin-left: 115px "
        >
          Monthly
        </div>
        <div
          className="chart-button"
          onClick={() => this.labels_weekly()}
          Style="margin-left: 200px "
        >
          Weekly
        </div>
        <div
          className="chart-button"
          onClick={this.handleClickOpen}
          Style="margin-left: 273px "
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
            <DialogPicker title="Start Date" onChange={this.setBeginDate} />
            <DialogPicker title="End Date" onChange={this.setEndDate} />
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
