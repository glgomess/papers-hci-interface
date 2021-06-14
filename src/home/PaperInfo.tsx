import { Card, CardContent, CardHeader, Link, Typography, Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PaperInfoLoading from './PaperInfoLoading'
import { toTitleCase } from '../utils/functions'
import gql from 'graphql-tag'
import { useLazyQuery, useQuery } from 'react-apollo'

interface CustomProps {
  paper?: any,
  loading: boolean,
  handleCurrentPaper: Function,
  setSelectedKeywords: Function,
  selectedKeywords: any,
  setSelectedAuthor: Function,
  selectedAuthor: any
}

const GET_PAPER_KEYWORDS = gql`
query getMultipleKeywords($ids: [Int]) {
  getMultipleKeywords(ids: $ids) {
    keyword_en
    keyword_id
    papers_list
  }
}
`

const GET_PAPER_AUTHORS = gql`
query getMultipleAuthors($ids: [Int]) {
  getMultipleAuthors(ids: $ids) {
    person_name
    person_name_in_ref
    person_id
    papers_list
  }
}
`

const PaperInfo = ({ paper, loading, handleCurrentPaper, setSelectedKeywords, selectedKeywords,setSelectedAuthor, selectedAuthor }: CustomProps) => {

  const LANGUAGES = [
    {
      label: 'PT',
      value: 'pt'
    },
    {
      label: 'EN',
      value: 'en'
    },
    {
      label: 'ES',
      value: 'es'
    },
  ]

  const [getKeywords, { data: keywords  } ] = useLazyQuery(GET_PAPER_KEYWORDS);
  const [getAuthors, { data: authors } ] = useLazyQuery(GET_PAPER_AUTHORS);

  const [selectedLanguage, setSelectedLanguage] = useState<string>('pt')
  const abstract = paper?.getPaper[`paper_abstract_${selectedLanguage}`]

  useEffect(() => {
    const defaultLanguage = paper?.getPaper.paper_language.split('-')[0].toLowerCase()

    if(paper?.getPaper.paper_keywords.length >0){
      const keywordsIds = paper.getPaper.paper_keywords;
      getKeywords({ variables: { ids: keywordsIds } });
    }

    if(paper?.getPaper.paper_authors.length >0){
      const authorsIds = paper.getPaper.paper_authors;
      getAuthors({ variables: { ids: authorsIds } });
    }

    if (LANGUAGES.find(l => l.value == defaultLanguage)) setSelectedLanguage(defaultLanguage)
  }, [paper])

  const handleSelectedAuthor = (value: any) => {
    const aux = [value, ...selectedAuthor];
    setSelectedAuthor(aux);
  }

  const handleSelectedKeyword = (value: any) => {
    const aux = [value, ...selectedKeywords];
    setSelectedKeywords(aux);
  }

  return (
    <Card className="flex flex-column justify-center ma5 pa4">
      <CardHeader
        title="Artigo"
        titleTypographyProps={{
          color: 'textSecondary',
          variant: 'overline',
        }}
      />
      <CardContent>
        {!paper && !loading && (
          <Typography variant="subtitle1" color="textSecondary">
            Nenhum artigo selecionado
          </Typography>
        )}
        {loading && <PaperInfoLoading />}
        {paper && !loading && (
          <>
            <div className="flex flex-auto pt2 pb4">
              <Typography variant="h4" gutterBottom>
                {paper.getPaper.paper_title}
              </Typography>
            </div>
            <div className="flex flex-row pb3">
              <div className="flex-auto flex-column w-80 pr5">
                <div className="flex flex-row mb3">
                  <div className="flex flex-auto">
                    <Typography variant="h6">
                      Resumo
                </Typography>
                  </div>
                  <div className="flex flex-end">
                    {LANGUAGES.map((option, index) =>
                      <Button
                        key={index}
                        color="primary"
                        variant={selectedLanguage == option.value ? 'outlined' : 'text'}
                        disabled={!paper}
                        onClick={() => setSelectedLanguage(option.value)}>{option.label}
                      </Button>
                    )}
                  </div>
                </div>
                {!abstract || abstract == 'NA' ? (
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    Nenhum
                  </Typography>
                ) : (
                    <Typography variant="body1" gutterBottom>
                      {abstract}
                    </Typography>
                  )
                }
              </div>
              <div className="flex-auto flex-column w-20">
                <Typography variant="h6" gutterBottom>
                  Autores
                </Typography>
                {authors?.getMultipleAuthors?.length ? (
                  <Typography variant="body1" display="block" gutterBottom>
                    {authors.getMultipleAuthors.map((author: any, index: number) => (
                      <span key={index} className="flex pb2" onClick={()=>handleSelectedAuthor(author)}>{author.person_name}</span>
                    ))}
                  </Typography>
                ) : (
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Nenhum
                    </Typography>
                  )}
                   <Typography variant="h6" gutterBottom>
                  Keywords
                </Typography>
                {keywords?.getMultipleKeywords?.length ? (
                  <Typography variant="body1" display="block" gutterBottom>
                    {keywords.getMultipleKeywords.map((keyword: any, index: number) => (
                      <span key={index} className="flex pb2" onClick={()=>handleSelectedKeyword(keyword)}>{toTitleCase(keyword.keyword_en)}</span>
                    ))}
                  </Typography>
                ) : (
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Nenhum
                    </Typography>
                  )}
              </div>
            </div>
            <div className="flex flex-column pb3 w-80">
              <Typography variant="h6" gutterBottom>
                Referências
              </Typography>
              {paper.getPaper.paper_references?.length ? (
                <Typography variant="body1" gutterBottom>
                  {paper.getPaper.paper_references.map((reference: any, index: any) => (
                    <span key={index} className="flex pb2">
                      {
                        reference.paper_reference_id
                          ? <Link onClick={() => handleCurrentPaper(reference.paper_reference_id)}>
                            {reference.paper_reference}
                          </Link>
                          : <span>{reference.paper_reference}</span>
                      }
                    </span>
                  ))}
                </Typography>
              ) : (
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    Nenhum
                  </Typography>
                )}
            </div>
            <div className="flex flex-column pb3 w-80">
              <Typography variant="h6" gutterBottom>
                Citações
              </Typography>
              {paper.getReferencedByPapers?.length ? (
                <Typography variant="body1" gutterBottom>
                  {paper.getReferencedByPapers.map((referenceBy: any, index: any) => (
                    <span key={index} className="flex pb2">
                      <Link onClick={() => handleCurrentPaper(referenceBy.paper_id)}>
                        {referenceBy.paper_title}
                      </Link>
                    </span>
                  ))}
                </Typography>
              ) : (
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    Nenhum
                  </Typography>
                )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default PaperInfo
