/// <reference types="react-vis-types" />
import React, { useEffect, useState } from 'react'
import { HorizontalGridLines, makeVisFlexible, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis'
import '../../node_modules/react-vis/dist/style.css'
import { CustomLabelSeries } from '../articles-chart/custom-label-series.js'
import RangeSlider from './RangeSlider'
import { CURRENT_PAPER_COLOR, CITED_PAPERS_COLOR, CITED_BY_PAPERS_COLOR } from '../utils/constants'

interface Ticks {
  all: number[]
  visible: number[]
}

interface DataPoint {
  x: number
  y: number
  label: any
  id?: number
  style?: Object
  xOffset?: number
  yOffset?: number
}

interface CustomProps {
  data: any
  handlePaperId: Function
  selectedPaper: any
}

interface Hightlight {
  paperId: number
  color: string
}

let MAX_PAPERS_PER_YEAR = 40

const PapersChart = ({ data, handlePaperId, selectedPaper }: CustomProps) => {
  const [XDomain, setXDomain] = useState<number[]>([0, 0])
  const [years, setYears] = useState<Years>({
    first: 1998,
    last: 2018,
    set: [],
  })
  const [chartData, setChartData] = useState<{ [year: number]: DataPoint[] }>({})
  const [ticks, setTicks] = useState<Ticks>({
    all: [],
    visible: [],
  })
  const [citedPapers, setCitedPapers] = useState<any[]>([])
  const [citedBy, setCitedBy] = useState<any[]>([])

  const TICK_SPACE = 4

  const buildChartData = (newData: any) => {
    const newChartData: { [year: number]: DataPoint[] } = {}
    years.set.map((year: number, idx: number) => {
      const dt = newData.find((dt: any) => dt.year == year)
      if (dt) {
        if (dt.total > MAX_PAPERS_PER_YEAR) {
          MAX_PAPERS_PER_YEAR = dt.total
        }
        newChartData[year] = []
        dt.papers.map((paper: any, index: number) => {
          newChartData[year].push({
            x: idx * TICK_SPACE,
            y: index * 2,
            label: paper.paper_title,
            id: paper.paper_id,
            style: { textAnchor: 'start' },
            xOffset: 10,
          })
        })
      } else {
        // Fill out empty, years with no papers
        newChartData[year] = [
          {
            x: idx * TICK_SPACE,
            y: 0,
            label: '',
          },
        ]
      }
    })
    return newChartData
  }

  const handleRangeInput = ({ start, end }: { start: number; end: number }) => {
    const startIndex = years.set.findIndex((el: any) => el == start)
    const endIndex = years.set.findIndex((el: any) => el == end)

    // Scale start/end years and add padding
    const startX = startIndex * TICK_SPACE
    const endX = endIndex * TICK_SPACE + TICK_SPACE

    const visibleTicks = ticks.all.slice(startIndex, endIndex + 1)
    setXDomain([startX, endX])
    setTicks({
      ...ticks,
      visible: visibleTicks,
    })
  }

  useEffect(() => {
    const yearsWithPapers = data.reverse().map(({ year }: any) => year)
    const first = yearsWithPapers[0] || 1998
    const last = yearsWithPapers[yearsWithPapers.length - 1] || 2018
    const fullYearsSet = Array.from(Array(last - first + 1).keys()).map((curr: any) => curr + first)
    setYears({
      first,
      last,
      set: fullYearsSet,
    })
    handleRangeInput({
      start: last - 1,
      end: last,
    })
  }, [data])

  useEffect(() => {
    setChartData(buildChartData(data))
    setTicks({
      ...ticks,
      all: Array.from(Array(years.set.length).keys()).map((el) => el * TICK_SPACE),
    })
  }, [years])

  useEffect(() => {
    if (selectedPaper?.getPaper?.paper_references) {
      const cited: number[] = selectedPaper.getPaper.paper_references.filter((reference: any) => reference.paper_reference_id !== null)
      setCitedPapers(cited)
    }
    if (selectedPaper?.getReferencedByPapers) {
      setCitedBy(selectedPaper.getReferencedByPapers)
    }
  }, [selectedPaper])

  const getVisibleLabels = (tick: any) => {
    const index = tick / TICK_SPACE
    return `${years.set[index]}`
  }

  const FlexibleXYPlot = makeVisFlexible(XYPlot)

  return (
    <div className="mw9 mh4" id="chartDIV">
      <FlexibleXYPlot xDomain={XDomain} yDomain={[0, MAX_PAPERS_PER_YEAR * 2]} height={850}>
        <HorizontalGridLines
          tickValues={Array.from(Array(MAX_PAPERS_PER_YEAR * 2).keys()).reduce(
            (prev: number[], next: number) => (next % 10 == 0 ? [...prev, next] : [...prev]),
            []
          )}
        />
        <XAxis tickValues={ticks.visible} tickFormat={getVisibleLabels} />
        <YAxis tickFormat={(tick: any) => (tick % 2 == 0 ? `${tick / 2}` : '')} />
        {Object.keys(chartData).map((year: any, index: number) => {
          const dataPoints = chartData[year]
          return (
            <CustomLabelSeries
              key={`${year}-${index}`}
              startX={index * TICK_SPACE}
              endX={(index + 1) * TICK_SPACE}
              data={dataPoints}
              onValueMouseOver={(paperElement: DataPoint) => { }}
              onValueMouseOut={(paperElement: DataPoint) => { }}
              onValueClick={(paperElement: any) => handlePaperId(paperElement.id!)}
              highlights={[
                { paperId: selectedPaper?.getPaper?.paper_id, color: CURRENT_PAPER_COLOR },
                ...citedPapers.map((reference) => {
                  return { paperId: reference.paper_reference_id, color: CITED_PAPERS_COLOR }
                }),
                ...citedBy.map((referencedBy) => {
                  return { paperId: referencedBy.paper_id, color: CITED_BY_PAPERS_COLOR }
                }),
              ]}
            ></CustomLabelSeries>
          )
        })}
      </FlexibleXYPlot>
      <br />
      <RangeSlider years={years} handleRangeInput={handleRangeInput} />
    </div>
  )
}

export default PapersChart
