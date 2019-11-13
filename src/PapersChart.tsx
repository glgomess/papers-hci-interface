/// <reference types="react-vis-types" />
import React, { Component, useState, useEffect } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { XYPlot, makeVisFlexible, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LabelSeries, LineMarkSeriesCanvas } from 'react-vis'
import RangeSlider from './RangeSlider'

interface DateRange {
  start: number,
  end: number
}

const PapersChart = (props: any) => {

  const { data, handlePaperId } = props

  const [highlightSeries, setHighlight] = useState(null)
  const [XDomain, setXDomain] = useState<number[]>([0, 0])
  const [years, setYears] = useState<string[]>([])
  const [startYear, setStartYear] = useState<number>(0)
  const [endYear, setEndYear] = useState<number>(0)
  const [restartSlider, setRestartSlider] = useState(false)
  const [yearsRange, setYearsRange] = useState<DateRange>({ start: 0, end: 0 })
  const [ticks, setTicks] = useState<number[]>([])

  const chartData: any = []
  const tickSpace = 4
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

  const handleRangeInput = (values: number[]) => {
    console.log('range input', values)
    setStartYear(values[0])
    setEndYear(values[values.length - 1])
  }

  const openPaperDescription = (id: number) => {
    handlePaperId(id)
  }

  console.log('#years', years)
  console.log('#ticks', ticks)
  console.log('#XDomain', XDomain)

  useEffect(() => {
    console.log('props.data changed', props.data)
    setYears(Object.keys(props.data))
  }, [props.data])


  useEffect(() => {
    console.log('years changed', years)
    if (years.length > 0) {
      setYearsRange({ start: parseInt(years[0]), end: parseInt(years[years.length - 1]) })
    }
    setTicks(Array.from(Array(years.length).keys()).map(el => el * tickSpace))
  }, [years])

  useEffect(() => {
    setStartYear(years.length > 1 ? yearsRange.end - 1 : yearsRange.start)
    setEndYear(yearsRange.end)
  }, [yearsRange])

  useEffect(() => {
    console.log('something changed', startYear, endYear, yearsRange)
    setRestartSlider(!restartSlider)
    getXDomain()
  }, [startYear, endYear])

  const getXDomain = () => {
    // Scale start/end years and add padding
    const startX = years.findIndex((el: any) => el == startYear) * tickSpace - tickSpace / 2
    const endX = years.findIndex((el: any) => el == endYear) * tickSpace + tickSpace / 2

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
        <RangeSlider
          restart={restartSlider}
          startYear={startYear} endYear={endYear}
          yearsRange={yearsRange} handleRangeInput={handleRangeInput} />
      </div>
    </React.Fragment>
  )
}

export default PapersChart