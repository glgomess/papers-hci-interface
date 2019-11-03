/// <reference types="react-vis-types" />
import React, { Component } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { XYPlot, DecorativeAxis, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LabelSeries } from 'react-vis'
import { number } from 'prop-types'

const PapersChart = (props: any) => {

  console.log('props', props)

  const { data } = props

  const years: string[] = Object.keys(data)
  const firstYear = years.length > 0 ? parseInt(years[0]) : 0
  const lastYear = years.length > 0 ? parseInt(years[years.length - 1]) : 0
  console.log('years', years)

  const chartData: any = []

  years.map((year: string) => {
    const papers = data[year]
    papers.map(([paper_id, paper_title]: [number, string], index: any) => {
      chartData.push({
        x: year, y: index, label: paper_title.substring(0, 15) + '...', id: paper_id
      })
    })
  })

  console.log('data', chartData)

  const dt = [
    { x: 1998, y: 0, label: 'a1' },
    { x: 1999, y: 0, label: 'a2' },
  ];

  return (
    <XYPlot
      xDomain={[firstYear - 1, lastYear + 1]}
      yDomain={[0, 30]}
      width={700}
      height={500}
      >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickValues={years} tickFormat={year => `${year}`} />
      {/* <LineSeries data={dt} /> */}
      {/* <DecorativeAxis
        axisStart={{ x: firstYear, y: 0 }}
        axisEnd={{ x: lastYear, y: 0 }}
        axisDomain={[firstYear, lastYear]}
      /> */}
      <LabelSeries
        style={{ pointerEvents: 'stroke' }}
        data={chartData}
        labelAnchorX="middle"
        labelAnchorY="baseline"
      />
    </XYPlot>

  )
}

export default PapersChart