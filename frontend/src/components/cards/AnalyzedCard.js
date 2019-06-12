import React from "react";
import "./AnalyzedCard.css";

var Chart = require("chart.js");

class AnalyzedCard extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    console.log(this.props.providers);
    const labels = Object.keys(this.props.providers).map(key => key);
    const data = Object.keys(this.props.providers).map(
      key => this.props.providers[key]
    );
    this.loadChart = () => {
      new Chart(document.getElementById("doughnut-chart"), {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Providers",
              backgroundColor: [
                "#FF8000",
                "#1EABD7",
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
          maintainAspectRatio: true,

          cutoutPercentage: 60,
          legend: {
            position: "right",
            defaultFontSize: 25
          },
          title: {
            display: false,
            text: "Providers"
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
        <canvas id="doughnut-chart" />
      </div>
    );
  }
}

export default AnalyzedCard;
