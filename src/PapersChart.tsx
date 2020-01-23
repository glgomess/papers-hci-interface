/// <reference types="react-vis-types" />
import React, { Component, useState, useEffect } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { XYPlot, makeVisFlexible, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LabelSeries } from 'react-vis'
import RangeSlider from './RangeSlider'
import { PaperRefsResponse } from './Constants'
import * as d3 from 'd3'
import { CustomLabelSeries } from './custom-label-series.js'

interface DateRange {
  start: number,
  end: number
}

interface DataPoint {
  x: number,
  y: number,
  label: any,
  id: number | string,
  style: Object
}

interface CustomProps {
  data: any,
  handlePaperId: Function,
  currentPaperRefs: PaperRefsResponse
}

const PapersChart = (props: CustomProps) => {

  const { handlePaperId } = props

  const [highlightSeries, setHighlight] = useState(null)
  const [currentPaper, setCurrentPaper] = useState<number | null>(null)
  const [XDomain, setXDomain] = useState<number[]>([0, 0])
  const [years, setYears] = useState<string[]>([])
  const [chartData, setChartData] = useState<DataPoint[]>([])
  const [maxPapersPerYear, setMaxPapersPerYear] = useState(0)
  const [startYear, setStartYear] = useState<number>(0)
  const [endYear, setEndYear] = useState<number>(0)
  const [restartSlider, setRestartSlider] = useState(false)
  const [yearsRange, setYearsRange] = useState<DateRange>({ start: 0, end: 0 })
  const [ticks, setTicks] = useState<number[]>([])
  const [citedPapers, setCitedPapers] = useState<Array<number>>([])
  const [citedBy, setCitedBy] = useState<Array<number>>([])

  const tickSpace = 4

  const buildChartData = (newData: any) => {
    const newChartData: DataPoint[] = []
    setMaxPapersPerYear(0)

    years.map((year: string, idx: number) => {
      const papers = newData[year]
      if (papers) {
        if (papers.length > maxPapersPerYear) {
          setMaxPapersPerYear(papers.length)
        }
        papers.map(([paper_id, paper_title]: [number, string], index: number) => {
          newChartData.push({
            x: idx * tickSpace,
            y: index,
            label: paper_title,
            id: paper_id,
            style: { fontSize: 10, textAnchor: 'start' }
          })
        })
      } else { // Fill out empty, years with no papers
        newChartData.push({
          x: idx * tickSpace,
          y: 0,
          label: '',
          id: '#' + year,
          style: { fontSize: 10}
        })
      }
    })
    return newChartData
  }

  const handleRangeInput = (values: number[]) => {
    setStartYear(values[0])
    setEndYear(values[values.length - 1])
  }

  const openPaperDescription = (id: number) => {
    setCurrentPaper(id)
    handlePaperId(id)
  }

  useEffect(() => {
    const yearsSetWithPapers = Object.keys(props.data)
    const firstYear = yearsSetWithPapers.length ? parseInt(yearsSetWithPapers[0]) : 0
    const lastYear = yearsSetWithPapers.length ? parseInt(yearsSetWithPapers[yearsSetWithPapers.length - 1]) : 0
    const fullYearsSet = Array.from(Array(lastYear - firstYear + 1).keys()).map((el: any) => (el + firstYear).toString())
    setYears(fullYearsSet)
    setYearsRange({ start: firstYear, end: lastYear })
  }, [props.data])

  useEffect(() => {
    setChartData(buildChartData(props.data))
    setTicks(Array.from(Array(years.length).keys()).map(el => el * tickSpace))
  }, [years])

  useEffect(() => {
    setStartYear(years.length > 1 ? yearsRange.end - 1 : yearsRange.start)
    setEndYear(yearsRange.end)
  }, [yearsRange])

  useEffect(() => {
    setRestartSlider(!restartSlider)
    getXDomain()
  }, [startYear, endYear])

  useEffect(() => {
    if (props.currentPaperRefs) {
      if (props.currentPaperRefs.cited) {
        const cited: Array<number> = props.currentPaperRefs.cited.map(([paper_id, paper_title]: [number, string]) => paper_id)
        setCitedPapers(cited)
      }
      if (props.currentPaperRefs.citedBy) {
        const citedBy: Array<number> = props.currentPaperRefs.citedBy.map(([paper_id, paper_title]: [number, string]) => paper_id)
        setCitedBy(citedBy)
      }
    }
  }, [props.currentPaperRefs])

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

  const getElementStroke = (id: number) => {
    if (id === currentPaper)
      return 'blue'
    else if (id === highlightSeries)
      return 'black'
    else if (citedPapers.includes(id))
      return 'green'
    else if (citedBy.includes(id))
      return 'red'

    return 'none'
  }

  const FlexibleXYPlot = makeVisFlexible(XYPlot)

  return (
    <React.Fragment>
      <h2>Papers</h2>
      <div className="pr3" id="chartDIV">
        <FlexibleXYPlot
          xDomain={XDomain}
          yDomain={[0, maxPapersPerYear + 1]}
          height={550}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickValues={getVisibleTicks()} tickFormat={getVisibleLabels} />
          <YAxis />
          {chartData.map((el: any) => {
            return <CustomLabelSeries
              key={el.id}
              style={{
                pointerEvents: 'stroke',
                stroke: getElementStroke(el.id),
                opacity: (el.id === highlightSeries || el.id === currentPaper ? 1.0 : 0.6)
              }}
              data={[el]}
              labelAnchorX="start"
              labelAnchorY="baseline"
              // onValueMouseOver={() => setHighlight(el.id)}
              // onValueMouseOut={() => setHighlight(null)}
              onValueClick={() => openPaperDescription(el.id)}
              textMaxWidth={"400px"}
            ></CustomLabelSeries>
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
