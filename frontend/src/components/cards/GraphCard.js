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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

var Chart = require("chart.js");

const CUSTOM_DAY_FORMAT = "DD-MM-YY";
const CUSTOM_WEEK_FORMAT = "Wo-YY";
const CUSTOM_MONTH_FORMAT = "MMM-YY";
const CUSTOM_YEAR_FORMAT = "YYYY";

//Styles for the custom dialog
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

//Dialog
const DialogTitle = withStyles(styles)(props => {
  const { children, classes } = props;
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
    endDate: "05-05-2019",
    isCustom: false,
    customRange: "null",
    customRangeType: "null"
  };

  //Open custom dialog event
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleChange = event => {
    const state = this.state;

    state.customRange = event.target.value;
    if (event.target.value === CUSTOM_DAY_FORMAT)
      state.customRangeType = "days";
    if (event.target.value === CUSTOM_WEEK_FORMAT)
      state.customRangeType = "weeks";
    if (event.target.value === CUSTOM_MONTH_FORMAT)
      state.customRangeType = "months";
    if (event.target.value === CUSTOM_YEAR_FORMAT)
      state.customRangeType = "years";

    this.setState(state);
  };

  //Close custom dialog event
  handleClose = () => {
    const state = this.state;
    this.labels_custom();
    state.open = false;
    this.setState(state);
  };

  constructor(props) {
    super(props);

    //let topics = require("./topics");

    this.calculateData = () => {
      const datasets = [];
      for (const topic of this.state.topics) {
        const dataset = {
          data: [],
          label: topic.name,
          borderColor: topic.color,
          fill: false
        };
        for (let i = 0; i < this.state.labels.length; i++) {
          dataset.data.push(0);
        }
        for (const article of topic.articles) {
          const articleString = moment
            .unix(article.timestamp)
            .format(this.state.DateFormat);
          this.state.labels.forEach((label, index) => {
            if (articleString === label) {
              dataset.data[index] += Math.round(article.score * 100);
            }
          });
        }

        datasets.push(dataset);
      }
      return datasets;
    };

    //Chartjs load
    this.loadChart = () => {
      const datasets = this.calculateData();
      var ctx = document.getElementById("myChart").getContext("2d");

      const state = this.state;
      if (!state.chart) {
        state.chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [],
            datasets: []
          },
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
      state.chart.update();
      this.setState(state);
    };

    this.labels_custom = () => {
      var begin = moment(
        document.getElementById("dateStart Date").value,
        "YYYY-MM-DD"
      );
      var end = moment(
        document.getElementById("dateEnd Date").value,
        "YYYY-MM-DD"
      );

      if (
        end.diff(begin, "day") <= 0 ||
        begin.diff(moment.now(), "days") >= 0 ||
        end.diff(moment.now(), "days") > 0
      ) {
        return;
      }

      var customCount = 0;
      var customFormat = CUSTOM_WEEK_FORMAT;
      var customType = "weeks";

      var dayCount = end.diff(begin, "day");
      var weekCount = end.diff(begin, "week");
      var monthCount = end.diff(begin, "month");
      var yearCount = end.diff(begin, "year");

      if (this.state.customRange === "null") {
        if (dayCount < 14) {
          customCount = dayCount;
          customFormat = CUSTOM_DAY_FORMAT;
          customType = "days";
        }
        if (weekCount < 26 && weekCount >= 2) {
          customCount = weekCount;
          customFormat = CUSTOM_WEEK_FORMAT;
          customType = "weeks";
        }
        if (monthCount < 24 && monthCount >= 4) {
          customCount = monthCount;
          customFormat = CUSTOM_MONTH_FORMAT;
          customType = "months";
        }
        if (yearCount >= 2) {
          customCount = yearCount;
          customFormat = CUSTOM_YEAR_FORMAT;
          customType = "years";
        }
      } else {
        customFormat = this.state.customRange;
        customType = this.state.customRangeType;
        switch (customFormat) {
          case CUSTOM_DAY_FORMAT:
            customCount = dayCount;
            break;
          case CUSTOM_WEEK_FORMAT:
            customCount = weekCount;
            break;
          case CUSTOM_MONTH_FORMAT:
            customCount = monthCount;
            break;
          case CUSTOM_YEAR_FORMAT:
            customCount = yearCount;
            break;
          default:
            break;
        }
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
      state.isCustom = true;
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
      state.isCustom = false;
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
      state.isCustom = false;
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
      state.isCustom = false;
      this.setState(state);
      this.loadChart();
    };
  }

  componentDidMount() {
    this.labels_monthly();
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
          className={"chart-button"}
          onClick={() => this.labels_yearly()}
          style={{
            marginLeft: "8px ",
            backgroundColor:
              this.state.DateFormat === "YYYY" && !this.state.isCustom
                ? this.props.pageColor
                : "#A9A9A9"
          }}
        >
          Yearly
        </div>
        <div
          className={"chart-button"}
          onClick={() => this.labels_monthly()}
          style={{
            marginLeft: "8px ",
            backgroundColor:
              this.state.DateFormat === "MMMM" && !this.state.isCustom
                ? this.props.pageColor
                : "#A9A9A9"
          }}
        >
          Monthly
        </div>
        <div
          className={"chart-button"}
          onClick={() => this.labels_weekly()}
          style={{
            marginLeft: "8px ",
            backgroundColor:
              this.state.DateFormat === "WW" && !this.state.isCustom
                ? this.props.pageColor
                : "#A9A9A9"
          }}
        >
          Weekly
        </div>
        <div
          className={
            "chart-button" + (this.state.isCustom ? " chart-button-active" : "")
          }
          onClick={this.handleClickOpen}
          style={{
            marginLeft: "8px ",
            backgroundColor: this.state.isCustom
              ? this.props.pageColor
              : "#A9A9A9"
          }}
        >
          Custom
        </div>

        <canvas id="myChart" />
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Custom Date
          </DialogTitle>
          <DialogContent>
            <DialogPicker title="Start Date" />
            <DialogPicker title="End Date" />
            <form autoComplete="off">
              <FormControl>
                <InputLabel htmlFor="age-simple">Format</InputLabel>
                <Select
                  value={this.state.customRange}
                  onChange={this.handleChange}
                >
                  <MenuItem value="null">Automatic</MenuItem>
                  <MenuItem value={CUSTOM_DAY_FORMAT}>Days</MenuItem>
                  <MenuItem value={CUSTOM_WEEK_FORMAT}>Weeks</MenuItem>
                  <MenuItem value={CUSTOM_MONTH_FORMAT}>Months</MenuItem>
                  <MenuItem value={CUSTOM_YEAR_FORMAT}>Years</MenuItem>
                </Select>
              </FormControl>
            </form>
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
