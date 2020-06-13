import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'

interface CustomProps {
  years: Years
  handleRangeInput: Function
}

const RangeSlider = (props: CustomProps) => {
  const { handleRangeInput, years } = props

  const [viewRange, setViewRange] = useState<number[]>([years.last - 1, years.last])

  const handleChange = (event: any, newRange: number | number[]) => {
    const range = newRange as number[]
    setViewRange(range)
    handleRangeInput({
      start: range[0],
      end: range[range.length - 1],
    })
  }

  return (
    <div className="items-center pl5 pr5">
      <Typography id="range-slider" gutterBottom>
        Linha do Tempo
      </Typography>
      <Slider
        min={years.first}
        max={years.last}
        value={viewRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={(value) => `${value}`}
        marks={years.set.map((value: number) => {
          return { value: value, label: `${value}` }
        })}
        step={1}
      />
    </div>
  )
}

export default RangeSlider
