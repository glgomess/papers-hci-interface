import React, { useEffect, useState } from 'react'
import '../../../node_modules/react-vis/dist/style.css'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import '../../assets/css/paperList.css'
import { toTitleCase } from '../../utils/functions'
import ReactTooltip from 'react-tooltip'

const PapersListElement = ({ paper, selectedAuthor, selectedKeywords, handleCurrentPaper, setIsLoading }: any) => {
  let authorsList2: any = []
  let keywordList: any = []

  selectedAuthor.forEach((author) => {
    authorsList2.push(author.person_name)
  })

  selectedKeywords.forEach((keyword) => {
    keywordList.push(keyword.keyword_en)
  })

  return (
    <div>
      {
        <>
          <Card
            className="flex flex-column justify-center mh5 mb3 pa1"
            style={{ cursor: 'pointer' }}
            onClick={() => handleCurrentPaper(paper.paper_id)}
            data-tip="Clique para mais informações"
          >
            <CardHeader
              title={paper.paper_title + ' - ' + paper.paper_year}
              titleTypographyProps={{
                color: 'textPrimary',
                variant: 'h6',
              }}
            />
            <CardContent>
              Autores: <br />
              {paper.paper_authors && (
                <div className="authors add-opacity">
                  {paper.paper_authors.map((author: any, index: number) =>
                    authorsList2.indexOf(author.person_name) != -1 ? (
                      <span key={index} className="selected selected-author">
                        {' '}
                        {author.person_name}|{' '}
                      </span>
                    ) : (
                      <span key={index} className="pb2 mr2">
                        {' '}
                        {author.person_name} |{' '}
                      </span>
                    )
                  )}
                </div>
              )}
              {/* VERIFICAR CASO DE PAPERS SEM KEYWORDS */}
              Keywords:
              <br />
              {paper.paper_keywords && (
                <div className="authors add-opacity">
                  {paper.paper_keywords?.map((keyword: any, index: number) =>
                    keywordList.indexOf(keyword.keyword) != -1 ? (
                      <span key={index} className="selected selected-author">
                        {' '}
                        {toTitleCase(keyword.keyword)}|{' '}
                      </span>
                    ) : (
                      <span key={index} className="pb2 mr2">
                        {' '}
                        {toTitleCase(keyword.keyword)} |{' '}
                      </span>
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          <ReactTooltip />
        </>
      }
    </div>
  )
}

export default PapersListElement
