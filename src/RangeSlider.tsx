import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface CustomProps {
  startYear: number,
  endYear: number,
  yearsRange: { start: number, end: number }
}

const RangeSlider = (props: CustomProps) => {

  const { startYear, endYear, yearsRange } = props

  const [value, setValue] = useState<number[]>([startYear, endYear]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  }

  const valuetext = (value: number) => {
    return `${value}`;
  }

  useEffect(() => {
    setValue([startYear, endYear])
  }, [props.startYear, props.endYear])

  return (
    <div className="items-center pl5 pr5">
      <Typography id="range-slider" gutterBottom>
        Years Range
      </Typography>
      <Slider
        min={yearsRange.start}
        max={yearsRange.end}
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