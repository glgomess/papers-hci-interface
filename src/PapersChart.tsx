/// <reference types="react-vis-types" />
import React, { Component, useState } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { XYPlot, makeVisFlexible, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LabelSeries, LineMarkSeriesCanvas } from 'react-vis'
import RangeSlider from './RangeSlider'

const PapersChart = (props: any) => {

  const { data, handlePaperId } = props

  const [highlightSeries, setHighlight] = useState(null)

  const years: string[] = Object.keys(data)
  const startYear: number = years.length > 0 ? parseInt(years[0]) : 0
  const endYear: number = years.length > 0 ? parseInt(years[years.length - 1]) : 0

  const chartData: any = []
  const tickSpace = 4
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
        label: paper_title.substring(0, 10) + '...',
        id: paper_id,
        style: { fontSize: 10, fill: '#000000' }
      })
    })
  })

  const openPaperDescription = (id: number) => {
    console.log('open:', id)
    handlePaperId(id)
  }

  const FlexibleXYPlot = makeVisFlexible(XYPlot);

  return (
    <React.Fragment>
      <h2>Papers</h2>
      <div className="pr3">
        <FlexibleXYPlot
          // xDomain={[-(tickSpace / 2), ticks[ticks.length - 1] + (tickSpace / 2)]}
          xDomain={[-2, 10]}
          yDomain={[0, maxPapersPerYear + 1]}
          height={550}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          {/* <XAxis tickValues={ticks} tickFormat={(year: any) => `${years[year / tickSpace]}`} /> */}
          <XAxis tickValues={ticks.slice(0, 3)} tickFormat={(year: any) => `${years[year / tickSpace]}`} />
          <YAxis />
          {/* <LineSeries data={dt} /> */}
          {chartData.map((el: any) => {
            return <LabelSeries
              key={el.id}
              style={{
                pointerEvents: 'stroke',
                stroke: (el.id === highlightSeries ? 'black' : 'none'),
                opacity: (el.id === highlightSeries ? 1.0 : 0.6)
              }}
              data={[el]}
              labelAnchorX="middle"
              labelAnchorY="baseline"
              onSeriesMouseOver={() => setHighlight(el.id)}
              onSeriesMouseOut={() => setHighlight(null)}
              onSeriesClick={() => openPaperDescription(el.id)}
            ></LabelSeries>
          })}
        </FlexibleXYPlot>
        <br />
        <RangeSlider startYear={startYear} endYear={endYear} />
      </div>
    </React.Fragment>
  )
}

export default PapersChart