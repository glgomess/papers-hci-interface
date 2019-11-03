/// <reference types="react-vis-types" />
import React, { Component } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { XYPlot, DecorativeAxis, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LabelSeries } from 'react-vis'

const PapersChart = (props: any) => {

  

  const data = [
    { x: 0, y: 0, label: 'a1' },
    { x: 0, y: 1, label: 'a2' },
    { x: 0, y: 2, label: 'a3' },
    { x: 2, y: 4, label: 'b' },
    { x: 4, y: 1, label: 'c' },
    { x: 6, y: 6, label: 'd' },
    { x: 8, y: 2, label: 'ee' },
    { x: 10, y: 0, label: 'ff' }
  ];

  return (
    <XYPlot
      xDomain={[0, 11]}
      yDomain={[0, 11]}
      width={300}
      height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <LineSeries data={data} />
      <DecorativeAxis
        axisStart={{ x: 0, y: 0 }}
        axisEnd={{ x: 0, y: 10 }}
        axisDomain={[0, 10]}
      />
      <DecorativeAxis
        axisStart={{ x: 2, y: 0 }}
        axisEnd={{ x: 2, y: 10 }}
        axisDomain={[0, 10]}
      />
      <DecorativeAxis
        axisStart={{ x: 4, y: 0 }}
        axisEnd={{ x: 4, y: 10 }}
        axisDomain={[0, 10]}
      />
      <LabelSeries
        style={{ pointerEvents: 'none' }}
        data={data}
        labelAnchorX="middle"
        labelAnchorY="baseline"
      />
    </XYPlot>

  )
}

export default PapersChart