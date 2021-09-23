import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { numeral } from "numeral";

const options = {
  legend: {
    display: false, //This will do the task
  },
  scales: {
    yAxes: [
      {
        ticks: {
          // beginAtZero: true,
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
  },
};

function LineGraph({ casesType = "cases", ...props }) {
  const [data, setData] = useState({});
  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }

      lastDataPoint = data[casesType][date];
    }

    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className={props.className}>
      <h1>Live Cases By Country</h1>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                label: "daily new cases",
                data: data,
                fill: true,
                backgroundColor: "rgb(255, 99, 132, 0.8)",
                borderColor: "rgba(255, 99, 132, 0.4)",
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
