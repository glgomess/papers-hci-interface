import React, { useEffect, useState } from 'react'
import '../../node_modules/react-vis/dist/style.css'
import { CustomLabelSeries } from '../articles-chart/custom-label-series.js'
import { CITED_BY_PAPERS_COLOR, CITED_PAPERS_COLOR, CURRENT_PAPER_COLOR } from '../utils/constants'
import { Card, CardContent, CardHeader, Link, Typography, Button } from '@material-ui/core'


interface CustomProps {
  data: any
  handleCurrentPaper: Function
  selectedPaper: any
}

interface Hightlight {
  paperId: number
  color: string
}

const PapersList = ({ data, handleCurrentPaper, selectedPaper }: CustomProps) => {
  //console.log('PapersList', data);

  const handleSelected = (value: any) => {
    //console.log("value", value)
    handleCurrentPaper(value.paper_id);
  }

  return (
        <div>
        {
            data.map((d:any, idx:number) => (
                <Card key= {idx} className="flex flex-column justify-center ma5 pa1" onClick={()=>handleSelected(d)}>
                    <CardHeader
                        title={d.paper_title}
                        titleTypographyProps={{
                            color: 'textPrimary',
                            variant: 'h6',
                        }}
                    />
                    <CardContent>
                       Autores: [mostrar aqui os autores] (?)<br />
                       Keywords: [mostrar aqui os Keywords] (?)
                    </CardContent>
                </Card>
            ))
        }
        </div>

  )
}

export default PapersList
