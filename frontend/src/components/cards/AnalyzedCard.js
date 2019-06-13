import React from "react";
import "./AnalyzedCard.css";
import Typography from "@material-ui/core/Typography";

var Chart = require("chart.js");

class AnalyzedCard extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    const labels = Object.keys(this.props.providers).map(key => key);
    const data = Object.keys(this.props.providers).map(
      key => this.props.providers[key]
    );
    this.loadChart = () => {
      new Chart(document.getElementById("doughnut-chart"), {
        textBaseline: "middel",

        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Providers",
              backgroundColor: [
                "#1EABD7",
                "#FF8000",
                "#C19000",
                "#cad212",
                "#D24DFF",
                "#12D4FF",
                "#D80000",
                "#9D000F",
                "#003478",
                "#8A8B8E"
              ],
              data: data
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          cutoutPercentage: 60,
          legend: {
            position: "right",
            defaultFontSize: 25
          },
          title: {
            display: true,
            text: data[0] + data[1] + " Articles",
            position: "top",
            fontSize: 20
          }
        }
      });
    };
  }

  componentDidMount() {
    this.loadChart();
  }

  render() {
    return (
      <div className="analyzed-card">
        {/* <div className="article-count">
          <Typography>Yeet</Typography>
        </div> */}
        <canvas id="doughnut-chart" />
      </div>
    );
  }
}

export default AnalyzedCard;
