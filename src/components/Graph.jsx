import React from 'react'
import { countUniqueWords, findAverage, roundToDecimalPlaces } from '../Utility'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'


function Graph({wps, cps,  stats, timesteps, numberOfWords, inputText}) {

  // Change the stats
  const wpsAdjusted = wps.slice(1)
  const cpsAdjusted = cps.slice(1)
  const timestepsAdjusted = timesteps.slice(1)
  // const numberOfWordsAdjusted = numberOfWords.slice(1)


  // Stats
  const averageWps = findAverage(wpsAdjusted)
  const averageCps = findAverage(cpsAdjusted)
  const totalNumberOfWords = countUniqueWords(inputText)
  // const totalNumberOfWords = findAverage(cpsAdjusted)

  // Graph
  const data = {
    labels: timesteps.slice(),
    datasets: [
      {
        label: "wps",
        data: wpsAdjusted,
        borderColor: "#F3E",
        backgroundColor: "#FFF",
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },

      {
        label: "cps",
        data: cpsAdjusted,
        borderColor: "#F31",
        backgroundColor: "#FFF",
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
        },
      ],
    },
    plugins: {
      title: {
        display: true,
        text: "Your Stats",
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "black",
          fontSize: 12,
        },
      },
    },
  };
  return (
    <div className='flex space-between'>
      <div className="flex-column medium-gap">
        <div className="flex-column">
          <p className='stats-label'>wps</p>
          <p className="stats-content">{roundToDecimalPlaces(averageWps, 2)}</p>
        </div>
        <div className="flex-column">
          <p className='stats-label'>cps</p>
          <p className="stats-content">{roundToDecimalPlaces(averageCps, 2)}</p>
        </div>
        <div className="flex-column">
          <p className='stats-label'>total words</p>
          <p className="stats-content">{roundToDecimalPlaces(totalNumberOfWords, 1)}</p>
        </div>
      </div>
      <div className="graph">
        <Line data={data} options={options}/>
      </div>
    </div>
  )
}

export default Graph