import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface CustomProps {
  startYear: number,
  endYear: number
}

const RangeSlider = (props: CustomProps) => {

  const { startYear, endYear } = props

  const [value, setValue] = useState<number[]>([endYear - 5, endYear]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  }

  const valuetext = (value: number) => {
    return `${value + startYear}`;
  }

  console.log(props, value)

  useEffect(() => {
    setValue([endYear - 5, endYear])
  }, [props.startYear, props.endYear])

  return (
    <div className="items-center pl5 pr5">
      <Typography id="range-slider" gutterBottom>
        Temperature range
      </Typography>
      <Slider
        min={startYear}
        max={endYear}
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