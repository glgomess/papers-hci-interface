/// <reference types="react-vis-types" />
import React, { useEffect, useState } from 'react'
import { HorizontalGridLines, makeVisFlexible, XAxis, XYPlot, YAxis } from 'react-vis'
import '../../node_modules/react-vis/dist/style.css'
import { CustomLabelSeries } from '../articles-chart/custom-label-series.js'
import { CITED_BY_PAPERS_COLOR, CITED_PAPERS_COLOR, CURRENT_PAPER_COLOR } from '../utils/constants'
import RangeSlider from './RangeSlider'

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
  handleCurrentPaper: Function
  selectedPaper: any
}

interface Hightlight {
  paperId: number
  color: string
}

let MAX_PAPERS_PER_YEAR = 40

const PapersChart = ({ data, handleCurrentPaper, selectedPaper }: CustomProps) => {
  // console.log('PapersData',data);

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
    console.log('newChartData', newChartData);
    return newChartData
  }

  //O QUE VAI TER NO RANGE
  const handleRangeInput = ({ start, end }: { start: number; end: number }) => {
    //console.log('handleRange', start, end, years);
    const startIndex = years.set.findIndex((el: any) => el == start)
    const endIndex = years.set.findIndex((el: any) => el == end)

    // Scale start/end years and add padding
    const startX = startIndex * TICK_SPACE
    const endX = endIndex * TICK_SPACE + TICK_SPACE
    //console.log('startX', startX);
    //console.log('endX', endX);


    const visibleTicks = ticks.all.slice(startIndex, endIndex + 1)
    //console.log('visibleTicks', visibleTicks);
    setXDomain([startX, endX])// a parte do grafico que esta vendo
    setTicks({
      ...ticks,
      visible: visibleTicks,
    })
  }

  useEffect(() => {
    //console.log("useEffect", data);
    const yearsWithPapers = data.map(({ year }: any) => year)
    let first = yearsWithPapers[yearsWithPapers.length - 1] ?? 1998
    let last = yearsWithPapers[0] ?? 2018
    let fullYearsSet = Array.from(Array(last - first + 1).keys()).map((curr: any) => curr + first)

    if(fullYearsSet.length == 1){

      fullYearsSet = [first-1, first, last+1];
      first -=1;
      last+=1;
    }

    setYears({
      first,
      last,
      set: fullYearsSet,
    })
  }, [data])

  useEffect(() => {
    handleRangeInput({start: years.last -5, end: years.last})
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

    const index = tick / TICK_SPACE;

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
              onValueClick={(paperElement: any) => handleCurrentPaper(paperElement.id!)}
              highlights={[
                { 
                  paperId: selectedPaper?.getPaper?.paper_id, 
                  color: CURRENT_PAPER_COLOR,
                  fontWeight: "bold"
                },
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
