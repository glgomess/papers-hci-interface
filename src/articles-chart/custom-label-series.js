// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react'
import PropTypes from 'prop-types'

import { AbstractSeries } from 'react-vis'

const getTextAnchor = (labelAnchorX, leftOfMiddle) => {
  return labelAnchorX ? labelAnchorX : leftOfMiddle ? 'start' : 'end'
}
const getDominantBaseline = (labelAnchorY, aboveMiddle) => {
  return labelAnchorY ? labelAnchorY : aboveMiddle ? 'text-before-edge' : 'text-after-edge'
}

export class CustomLabelSeries extends AbstractSeries {
  render() {
    const {
      allowOffsetToBeReversed,
      className,
      data,
      _data,
      getLabel,
      marginLeft,
      marginTop,
      rotation,
      style,
      xRange,
      yRange,
      labelAnchorX,
      labelAnchorY,
      highlights,
      startX,
      endX
    } = this.props
    if (!data) {
      return null
    }

    const xFunctor = this._getAttributeFunctor('x')
    const yFunctor = this._getAttributeFunctor('y')

    const FONTSIZE = 14
    const Y_OFFSET = -16

    return (
      <g
        // className={"rv-xy-plot__series rv-xy-plot__series--label"}
        className={'rv-xy-plot__series '}
        id={'label-series'}
        transform={`translate(${marginLeft},${marginTop})`}
        style={style}
      >
        {data.reduce((res, d, i) => {
          const { style: markStyle, xOffset, yOffset, id } = d
          if (!getLabel(d)) {
            return res
          }
          const xVal = xFunctor(d)
          const yVal = yFunctor(d)
          const leftOfMiddle = xVal < (xRange[1] - xRange[0]) / 2
          const aboveMiddle = yVal < Math.abs(yRange[1] - yRange[0]) / 2

          const x = xVal + (allowOffsetToBeReversed && leftOfMiddle ? -1 : 1) * (xOffset || 0)
          const y = yVal + (allowOffsetToBeReversed && aboveMiddle ? -1 : 1) * (Y_OFFSET || 0)

          const hasRotationValueSet = d.rotation === 0 || d.rotation
          const labelRotation = hasRotationValueSet ? d.rotation : rotation

          const hightlightedElement = highlights.find((el) => el.paperId == id)

          const attrs = {
            dominantBaseline: getDominantBaseline(labelAnchorY, aboveMiddle),
            className: 'rv-xy-plot__series--label-text',
            key: i,
            onClick: (e) => this._valueClickHandler(d, e),
            onContextMenu: (e) => this._valueRightClickHandler(d, e),
            onMouseOver: (e) => this._valueMouseOverHandler(d, e),
            onMouseOut: (e) => this._valueMouseOutHandler(d, e),
            textAnchor: getTextAnchor(labelAnchorX, leftOfMiddle),
            ...markStyle,
            style: hightlightedElement ? { color: hightlightedElement.color } : {},
          }
          const textContent = getLabel(_data ? _data[i] : d)
          return res.concat([
            <foreignObject
              x={x}
              y={y}
              key={i}
              width={`${Math.abs(xFunctor({ x: startX }) - xFunctor({ x: endX })) * 0.90}px`}
              height={FONTSIZE + 4}
              fontSize={FONTSIZE + 'px'}
            >
              <text {...attrs}>{textContent}</text>
            </foreignObject>
          ])
        }, [])}

      </g>
    )
  }
}

CustomLabelSeries.propTypes = {
  allowOffsetToBeReversed: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      angle: PropTypes.number,
      radius: PropTypes.number,
      label: PropTypes.string,
      xOffset: PropTypes.number,
      yOffset: PropTypes.number,
      style: PropTypes.object,
    })
  ).isRequired,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  rotation: PropTypes.number,
  style: PropTypes.object,
  xRange: PropTypes.arrayOf(PropTypes.number),
  yRange: PropTypes.arrayOf(PropTypes.number),
  labelAnchorX: PropTypes.string,
  labelAnchorY: PropTypes.string,
  verticalSpacing: PropTypes.number,
  highlights: PropTypes.arrayOf(PropTypes.any),
  startX: PropTypes.number,
  endX: PropTypes.number,
}
CustomLabelSeries.defaultProps = {
  ...AbstractSeries.defaultProps,
  rotation: 0,
  getLabel: (d) => d.label,
}
CustomLabelSeries.displayName = 'CustomLabelSeries'
