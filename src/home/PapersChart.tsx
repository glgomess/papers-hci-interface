/// <reference types="react-vis-types" />
import React, { useEffect, useState } from 'react'
import { HorizontalGridLines, makeVisFlexible, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis'
import '../../node_modules/react-vis/dist/style.css'
import { PaperRefsResponse } from '../Constants'
import { CustomLabelSeries } from '../custom-label-series.js'
import RangeSlider from './RangeSlider'

interface Ticks {
  all: number[],
  visible: number[]
}

interface DataPoint {
  x: number,
  y: number,
  label: any,
  id: number | string,
  style: Object,
  xOffset?: number,
  yOffset?: number,
}

interface CustomProps {
  data: any,
  handlePaperId: Function,
  currentPaperRefs: PaperRefsResponse
}

const MAX_PAPERS_PER_YEAR = 50

const PapersChart = ({
  data,
  handlePaperId,
  currentPaperRefs
}: CustomProps) => {

  const [highlightSeries, setHighlight] = useState(null)
  const [currentPaper, setCurrentPaper] = useState<number | null>(null)
  const [XDomain, setXDomain] = useState<number[]>([0, 0])
  const [years, setYears] = useState<Years>({
    first: 1998,
    last: 2018,
    set: []
  })
  const [chartData, setChartData] = useState<DataPoint[]>([])
  const [maxPapersPerYear, setMaxPapersPerYear] = useState(MAX_PAPERS_PER_YEAR)
  const [ticks, setTicks] = useState<Ticks>({
    all: [],
    visible: []
  })
  const [citedPapers, setCitedPapers] = useState<number[]>([])
  const [citedBy, setCitedBy] = useState<number[]>([])

  const TICK_SPACE = 4
  const HEIGHT_MARGIN = 2

  const buildChartData = (newData: any) => {
    const newChartData: DataPoint[] = []
    setMaxPapersPerYear(MAX_PAPERS_PER_YEAR)

    years.set.map((year: number, idx: number) => {
      const papers = newData[year.toString()]
      if (papers) {
        if (papers.length > maxPapersPerYear) {
          setMaxPapersPerYear(papers.length)
        }
        papers.map(([paper_id, paper_title]: [number, string], index: number) => {
          newChartData.push({
            x: idx * TICK_SPACE,
            y: index * 2,
            label: paper_title,
            id: paper_id,
            style: { fontSize: 14, textAnchor: 'start' },
            xOffset: -200,
            yOffset: -20,
          })
        })
      } else { // Fill out empty, years with no papers
        newChartData.push({
          x: idx * TICK_SPACE,
          y: 0,
          label: '',
          id: '#' + year,
          style: { fontSize: 10 }
        })
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

    setXDomain([startX, endX])
    setTicks({
      ...ticks,
      visible: ticks.all.slice(startIndex, endIndex + 1)
    })
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
    <div className="pr3" id="chartDIV">
      <FlexibleXYPlot
        xDomain={XDomain}
        yDomain={[0, 110]}
        height={850}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickValues={ticks.visible}
          tickFormat={getVisibleLabels}
        />
        <YAxis
          tickFormat={(tick: any) => tick % 2 == 0 ? `${tick / 2}` : ''}
        />
        {chartData.map((el: any) => {
          return <CustomLabelSeries
            key={el.id}
            style={{
              pointerEvents: 'stroke',
              stroke: getElementStroke(el.id),
              opacity: (el.id === highlightSeries || el.id === currentPaper ? 1.0 : 0.6)
            }}
            data={[el]}
            // onValueMouseOver={() => setHighlight(el.id)}
            // onValueMouseOut={() => setHighlight(null)}
            onValueClick={() => openPaperDescription(el.id)}
            textMaxWidth={"400px"}
          >
          </CustomLabelSeries>
        })}
      </FlexibleXYPlot>
      <br />
      <RangeSlider
        years={years}
        handleRangeInput={handleRangeInput}
      />
    </div>
  )
}

export default PapersChart
