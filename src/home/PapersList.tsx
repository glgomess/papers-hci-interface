import React, { useEffect, useState } from 'react'
import '../../node_modules/react-vis/dist/style.css'
import { CustomLabelSeries } from '../articles-chart/custom-label-series.js'
import { CITED_BY_PAPERS_COLOR, CITED_PAPERS_COLOR, CURRENT_PAPER_COLOR } from '../utils/constants'
import { Card, CardContent, CardHeader, Link, Typography, Button } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import "../assets/css/paperList.css";

interface CustomProps {
  data: any
  handleCurrentPaper: Function
  selectedPaper: any
}

interface Hightlight {
  paperId: number
  color: string
}

const PAPERS_PER_PAGE = 10;

const PapersList = ({ data, handleCurrentPaper, selectedPaper, selectedAuthor, selectedKeywords }: any) => {
  console.log('PapersList', data);

  const [currentPage, setCurrentPage] = useState(1);

  let authorsList2: any = [];
  let keywordList: any = [];

  selectedAuthor.forEach(author => {
    authorsList2.push(author.person_name);
  });

  selectedKeywords.forEach(keyword => {
    keywordList.push(keyword.keyword_en);
  });


  const handleSelected = (value: any) => {
    //console.log("value", value)
    handleCurrentPaper(value.paper_id);
  }

  const pageChanged = (event: object, page: number) => {
    console.log("page", page);
    setCurrentPage(page);
  }

  const paginationConfig = () =>{
    let numberPages = data.length / PAPERS_PER_PAGE;
    const start = (currentPage -1) * PAPERS_PER_PAGE;
    const end = start + PAPERS_PER_PAGE;
    let shownPapers = data.slice(start, end);
    console.log("numberPages", numberPages);
    console.log("start", start);
    console.log("end", end);
    console.log("shown", shownPapers);
  }
  //console.log("authorsList2.length", authorsList2.length)

  //paginationConfig();

  return (
        <div>
        {
            data.map((d:any, idx:number) => (
                <Card key= {idx} className="flex flex-column justify-center ma5 pa1" style={{cursor: "pointer"}} onClick={()=>handleSelected(d)}>
                    <CardHeader
                        title={d.paper_title}
                        titleTypographyProps={{
                            color: 'textPrimary',
                            variant: 'h6',
                        }}
                    />
                    <CardContent>
                       Autores: <br />
                       <div className="authors add-opacity">
                        {d.paper_authors?.map((author: string, index: number) => 
                          (authorsList2.indexOf(author) != -1 ?
                            (<span key={index} className="selected selected-author" > {author}| </span>)
                          :
                          (<span key={index} className="pb2 mr2" > {author} | </span>)

                        ))}
                       </div>
                       
                       {/* VERIFICAR CASO DE PAPERS SEM KEYWORDS */}
                       Keywords:<br />
                       {d.paper_keywords && <div className="authors add-opacity">
                        {d.paper_keywords.map((keyword: string, index: number) => 
                          (keywordList.indexOf(keyword) != -1 ?
                            (<span key={index} className="selected selected-keyword" > {keyword}| </span>)
                          :
                          (<span key={index} className="pb2 mr2" > {keyword} | </span>)

                        ))}
                       </div>}

                    </CardContent>
                </Card>
            ))
        }
        <Pagination count={10} onChange={pageChanged}/>
        </div>

  )
}

export default PapersList
