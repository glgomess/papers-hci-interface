/// <reference types="react-vis-types" />
import React, { Component, useState } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { XYPlot, DecorativeAxis, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LabelSeries, LineMarkSeriesCanvas } from 'react-vis'
import { number } from 'prop-types'

const PapersChart = (props: any) => {

  const { data } = props

  const [highlightSeries, setHighlight] = useState(null)

  const years: string[] = Object.keys(data)
  const chartData: any = []
  const tickSpace = 2
  const ticks = Array.from(Array(years.length).keys()).map(el => el * tickSpace)
  let maxPapersPerYear = 0

  years.map((year: string, idx: number) => {
    const papers = data[year]
    if (papers.length > maxPapersPerYear) {
      maxPapersPerYear = papers.length
    }
    papers.map(([paper_id, paper_title]: [number, string], index: number) => {
      chartData.push({
        x: idx * tickSpace,
        y: index,
        label: paper_title.substring(0, 5) + '...',
        id: paper_id,
        style: { fontSize: 10, fill: '#000000' }
      })
    })
  })

  return (
    <XYPlot
      xDomain={[-(tickSpace / 2), ticks[ticks.length - 1] + (tickSpace / 2)]}
      yDomain={[0, maxPapersPerYear + 1]}
      width={1000}
      height={650}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickValues={ticks} tickFormat={year => `${years[year / tickSpace]}`} />
      <YAxis />
      {/* <LineSeries data={dt} /> */}
      {chartData.map((el: any) => {
        const id = el.id

        return <LabelSeries
          key={id}
          style={{ pointerEvents: 'stroke', stroke: (id === highlightSeries ? 'black' : 'none') }}
          data={[el]}
          labelAnchorX="middle"
          labelAnchorY="baseline"
          onSeriesMouseOver={() => setHighlight(id)}
          onSeriesMouseOut={() => setHighlight(null)}
        ></LabelSeries>
      })}
    </XYPlot>

  )
}

export default PapersChart