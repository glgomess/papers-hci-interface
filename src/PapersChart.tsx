/// <reference types="react-vis-types" />
import React, { Component, useState, useEffect } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { XYPlot, makeVisFlexible, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LabelSeries, LineMarkSeriesCanvas } from 'react-vis'
import RangeSlider from './RangeSlider'

const PapersChart = (props: any) => {

  const { data, handlePaperId } = props

  const [highlightSeries, setHighlight] = useState(null)
  const [XDomain, setXDomain] = useState<number[]>([0, 0])

  const years: string[] = Object.keys(data)
  const yearsRange: { start: number, end: number } = years.length > 0 ?
    { start: parseInt(years[0]), end: parseInt(years[years.length - 1]) } :
    { start: 0, end: 0 }
  const startYear: number = years.length > 5 ? yearsRange.end - 5 : yearsRange.start
  const endYear: number = yearsRange.end

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
    handlePaperId(id)
  }

  useEffect(() => {
    getXDomain()
  }, [props.data])

  const getXDomain = () => {
    // Scale start/end years and add padding
    const startX = years.findIndex((el: any) => el == startYear) * tickSpace - tickSpace/2
    const endX = years.findIndex((el: any) => el == endYear) * tickSpace + tickSpace/2

    setXDomain([startX, endX])
  }

  const getVisibleTicks = () => {
    const begin = years.findIndex((el: any) => el == startYear)
    const end = years.findIndex((el: any) => el == endYear)

    return ticks.slice(begin, end + 1)
  }

  const getVisibleLabels = (tick: any) => {
    const index = tick / tickSpace

    return `${years[index]}`
  }

  const FlexibleXYPlot = makeVisFlexible(XYPlot);

  return (
    <React.Fragment>
      <h2>Papers</h2>
      <div className="pr3">
        <FlexibleXYPlot
          // xDomain={[-(tickSpace / 2), ticks[ticks.length - 1] + (tickSpace / 2)]}
          xDomain={XDomain}
          yDomain={[0, maxPapersPerYear + 1]}
          height={550}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          {/* <XAxis tickValues={ticks} tickFormat={(year: any) => `${years[year / tickSpace]}`} /> */}
          <XAxis tickValues={getVisibleTicks()} tickFormat={getVisibleLabels} />
          <YAxis />
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
        <RangeSlider startYear={startYear} endYear={endYear} yearsRange={yearsRange} />
      </div>
    </React.Fragment>
  )
}

export default PapersChart