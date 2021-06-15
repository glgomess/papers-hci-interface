import React, { useEffect, useState } from 'react'
import '../../node_modules/react-vis/dist/style.css'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import "../assets/css/paperList.css";
import { useLazyQuery } from 'react-apollo'
import gql from 'graphql-tag'
import ReactTooltip from 'react-tooltip';


const GET_PAPER_KEYWORDS = gql`
query getMultipleKeywords($ids: [Int]) {
  getMultipleKeywords(ids: $ids) {
    keyword_en
    keyword_id
  }
}
`


const GET_PAPER_AUTHORS = gql`
query getMultipleAuthors($ids: [Int]) {
  getMultipleAuthors(ids: $ids) {
    person_name
    person_id
  }
}
`


const PapersListElement = ({ paper, selectedAuthor, selectedKeywords, handleCurrentPaper }: any) => {

  const [getKeywords, { data: keywords, loading: loadingKeywords  } ] = useLazyQuery(GET_PAPER_KEYWORDS);

  const [getAuthors, { data: authors, loading: loadingAuthors  } ] = useLazyQuery(GET_PAPER_AUTHORS);

  let authorsList2: any = [];
  let keywordList: any = [];

  selectedAuthor.forEach(author => {
    authorsList2.push(author.person_name);
  });

  selectedKeywords.forEach(keyword => {
    keywordList.push(keyword.keyword_en);
  });

  useEffect( () =>{

    if (paper?.paper_keywords?.length > 0) {
        const keywordsIds = paper.paper_keywords;
        const authorsIds = paper.paper_authors;
        getKeywords({ variables: { ids: keywordsIds } });
        getAuthors({ variables: { ids: authorsIds } });
    }
    

  }, [paper] );




  return (
        <div>
        {
            
                !loadingKeywords && !loadingAuthors  && 
                <>
                <Card className="flex flex-column justify-center mh5 mb3 pa1" style={{cursor: "pointer"}}  
                onClick={()=>handleCurrentPaper(paper.paper_id)} data-tip="Clique para mais informações">
                    <CardHeader
                        title={paper.paper_title + " - " + paper.paper_year}
                        titleTypographyProps={{
                            color: 'textPrimary',
                            variant: 'h6',
                        }}
                    />
                    <CardContent>
                       Autores: <br />
                       <div className="authors add-opacity">
                        {paper.paper_authors?.map((author: string, index: number) => 
                          (authorsList2.indexOf(author) != -1 ?
                            (<span key={index} className="selected selected-author" > {author}| </span>)
                          :
                          (<span key={index} className="pb2 mr2" > {author} | </span>)

                        ))}
                       </div>
                       
                       {/* VERIFICAR CASO DE PAPERS SEM KEYWORDS */}
                       Keywords:<br />
                       {paper.paper_keywords && <div className="authors add-opacity">
                        {keywords?.getMultipleKeywords.map((keyword: any, index: number) => 
                          (keywordList.indexOf(keyword.keyword_en) != -1 ?
                            (<span key={index} className="selected selected-keyword" > {keyword.keyword_en}| </span>)
                          :
                          (<span key={index} className="pb2 mr2" > {keyword.keyword_en} | </span>)

                        ))}
                       </div>}

                    </CardContent>
                </Card>
                <ReactTooltip />
                </>
        }
        </div>

  )
}

export default PapersListElement
