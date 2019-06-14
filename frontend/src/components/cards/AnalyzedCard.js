import React from "react";
import "./AnalyzedCard.css";
import Chart from "chart.js";

Chart.pluginService.register({
  beforeDraw: function(chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;

      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || "Arial";
      var txt = centerConfig.text;
      var color = centerConfig.color || "#000";
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      //Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = chart.innerRadius * 2;

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});

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
          elements: {
            center: {
              text: data[0] + data[1] + " Articles",
              color: "", //Default black
              fontStyle: "Helvetica", //Default Arial
              sidePadding: 15 //Default 20 (as a percentage)
            }
          },
          responsive: true,
          maintainAspectRatio: false,

          cutoutPercentage: 60,
          legend: {
            position: "right",
            defaultFontSize: 25
          },
          title: {
            display: false,
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
