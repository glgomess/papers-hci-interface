/// <reference types="react-vis-types" />
import React, { useEffect, useState } from 'react'
import { HorizontalGridLines, makeVisFlexible, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis'
import '../../node_modules/react-vis/dist/style.css'
import { CustomLabelSeries } from '../custom-label-series.js'
import RangeSlider from './RangeSlider'
import { CURRENT_PAPER_COLOR, CITED_PAPERS_COLOR, CITED_BY_PAPERS_COLOR } from '../utils/constants'

interface Ticks {
  all: number[],
  visible: number[]
}

interface DataPoint {
  x: number,
  y: number,
  label: any,
  id?: number,
  style?: Object,
  xOffset?: number,
  yOffset?: number,
}

interface CustomProps {
  data: any,
  handlePaperId: Function,
  currentPaperRefs: PaperRefsResponse
}

interface Hightlight {
  paperId: number,
  color: string
}

let MAX_PAPERS_PER_YEAR = 40

const PapersChart = ({
  data,
  handlePaperId,
  currentPaperRefs
}: CustomProps) => {

  const [currentPaper, setCurrentPaper] = useState<number | null>(null)
  const [XDomain, setXDomain] = useState<number[]>([0, 0])
  const [years, setYears] = useState<Years>({
    first: 1998,
    last: 2018,
    set: []
  })
  const [chartData, setChartData] = useState<{ [year: number]: DataPoint[] }>({})
  const [ticks, setTicks] = useState<Ticks>({
    all: [],
    visible: []
  })
  const [citedPapers, setCitedPapers] = useState<number[]>([])
  const [citedBy, setCitedBy] = useState<number[]>([])
  const [columnsMaxWidth, setColumnsMaxWidth] = useState<string>()

  const TICK_SPACE = 4

  const buildChartData = (newData: any) => {
    const newChartData: { [year: number]: DataPoint[] } = {}
    years.set.map((year: number, idx: number) => {
      const papers = newData[year.toString()]
      if (papers) {
        if (papers.length > MAX_PAPERS_PER_YEAR) {
          MAX_PAPERS_PER_YEAR = papers.length
        }
        newChartData[year] = []
        papers.map(([paper_id, paper_title]: [number, string], index: number) => {
          newChartData[year].push({
            x: idx * TICK_SPACE,
            y: index * 2,
            label: paper_title,
            id: paper_id,
            style: { textAnchor: 'start' },
            xOffset: -200
            // yOffset: -20,
          })
        })
      } else { // Fill out empty, years with no papers
        newChartData[year] = [{
          x: idx * TICK_SPACE,
          y: 0,
          label: ''
        }]
      }
    })
    return newChartData
  }

  const handleRangeInput = ({ start, end }: { start: number, end: number }) => {
    const startIndex = years.set.findIndex((el: any) => el == start)
    const endIndex = years.set.findIndex((el: any) => el == end)

    // Scale start/end years and add padding
    const startX = startIndex * TICK_SPACE - TICK_SPACE / 2
    const endX = endIndex * TICK_SPACE + TICK_SPACE / 2

    const visibleTicks = ticks.all.slice(startIndex, endIndex + 1)
    setXDomain([startX, endX])
    setTicks({
      ...ticks,
      visible: visibleTicks
    })
    setColumnsMaxWidth((100 / visibleTicks.length ** 1.2) + '%')
  }

  const openPaperDescription = (id: number) => {
    setCurrentPaper(id)
    handlePaperId(id)
  }

  useEffect(() => {
    const yearsWithPapers = Object.keys(data).map((year: string) => parseInt(year))
    const first = yearsWithPapers[0] || 1998
    const last = yearsWithPapers[yearsWithPapers.length - 1] || 2018
    const fullYearsSet = Array.from(Array(last - first + 1).keys()).map((curr: any) => curr + first)
    setYears({
      first,
      last,
      set: fullYearsSet
    })
    handleRangeInput({
      start: last - 1,
      end: last
    })
  }, [data])

  useEffect(() => {
    setChartData(buildChartData(data))
    setTicks({
      ...ticks,
      all: Array.from(Array(years.set.length).keys()).map(el => el * TICK_SPACE)
    })
  }, [years])

  useEffect(() => {
    if (currentPaperRefs) {
      if (currentPaperRefs.cited) {
        const cited: number[] = currentPaperRefs.cited.map(([paper_id, paper_title]: [number, string]) => paper_id)
        setCitedPapers(cited)
      }
      if (currentPaperRefs.citedBy) {
        const citedBy: number[] = currentPaperRefs.citedBy.map(([paper_id, paper_title]: [number, string]) => paper_id)
        setCitedBy(citedBy)
      }
    }
  }, [currentPaperRefs])

  const getVisibleLabels = (tick: any) => {
    const index = tick / TICK_SPACE
    return `${years.set[index]}`
  }

  const FlexibleXYPlot = makeVisFlexible(XYPlot)

  return (
    <div className="pr3" id="chartDIV">
      <FlexibleXYPlot
        xDomain={XDomain}
        yDomain={[0, MAX_PAPERS_PER_YEAR * 2]}
        height={850}
      >
        <HorizontalGridLines
          tickValues={
            Array.from(Array(MAX_PAPERS_PER_YEAR * 2).keys()).reduce((prev: number[], next: number) =>
              next % 10 == 0 ? [...prev, next] : [...prev], [])
          }
        />
        <XAxis
          tickValues={ticks.visible}
          tickFormat={getVisibleLabels}
        />
        <YAxis
          tickFormat={(tick: any) => tick % 2 == 0 ? `${tick / 2}` : ''}
        />
        {Object.keys(chartData).map((year: any, index: number) => {
          const dataPoints = chartData[year]
          return <CustomLabelSeries
            key={`${year}-${index}`}
            data={dataPoints}
            onValueMouseOver={(paperElement: DataPoint) => { }}
            onValueMouseOut={(paperElement: DataPoint) => { }}
            onValueClick={(paperElement: DataPoint) => openPaperDescription(paperElement.id!)}
            highlights={[
              { paperId: currentPaper, color: CURRENT_PAPER_COLOR },
              ...citedPapers.map(paperId => { return { paperId, color: CITED_PAPERS_COLOR } }),
              ...citedBy.map(paperId => { return { paperId, color: CITED_BY_PAPERS_COLOR } })
            ]}
            textMaxWidth={columnsMaxWidth}
          >
          </CustomLabelSeries>

        })}
      </FlexibleXYPlot>
      <br />
      <RangeSlider
        years={years}
        handleRangeInput={handleRangeInput}
      />
    </div >
  )
}

export default PapersChart
