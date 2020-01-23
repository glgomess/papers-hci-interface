import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface CustomProps {
  restart: boolean,
  startYear: number,
  endYear: number,
  yearsRange: { start: number, end: number },
  handleRangeInput: Function
}

const RangeSlider = (props: CustomProps) => {
  
  const [value, setValue] = useState<number[]>([0, 0]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[])
    props.handleRangeInput(newValue as number[])
  }

  const valuetext = (value: number) => {
    return `${value}`;
  }

  useEffect(() => {
    setValue([props.startYear, props.endYear])
  }, [props.restart])

  return (
    <div className="items-center pl5 pr5">
      <Typography id="range-slider" gutterBottom>
        Years Range
      </Typography>
      <Slider
        min={props.yearsRange.start}
        max={props.yearsRange.end}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}

export default RangeSlider