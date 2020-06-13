import React, { useState, useEffect } from 'react'
import PapersChart from './PapersChart'
import PaperInfo from './PaperInfo'
import TextField from '@material-ui/core/TextField'
import ServiceWorker from '../serviceWorker/index'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from 'react-apollo'
import { debounce } from '../utils/functions'
import { Box } from '@material-ui/core'

const GET_PAPERS_BY_YEAR = gql`
  {
    getPapersByYear  {
      year,
      total,
      papers {
        paper_id
        paper_title
      }
    }
  }
`

const GET_PAPER = gql`
  query getPaper($id: Int) {
    getPaper(id: $id) {
      paper_id
      paper_title
      paper_language
      paper_abstract_pt
      paper_abstract_en
      paper_abstract_es
      paper_authors
      paper_references {
        paper_reference,
        paper_reference_id
      }
    }
  }
`

const SEARCH_PAPER = gql`
  query searchPaper($props: SearchProps) {
    searchPaper(props: $props) {
      paper_id
      paper_title
    }
  }
`

const Home = () => {
  const handleCurrentPaper = (id: number) => {
    getPaper({ variables: { id: id } })
  }

  const { data: dataPapers } = useQuery(GET_PAPERS_BY_YEAR)
  const [getPaper, { data: selectedPaper, loading: loadingSelectedPaper }] = useLazyQuery(GET_PAPER)
  const [searchPaper, { data: searchResult }] = useLazyQuery(SEARCH_PAPER)

  return (
    <>
      <div className="ma4">
        <div className="flex flex-column w-100 mh5">
          <div className="mw8 flex-auto">
            <TextField
              id="input-search"
              label="Pesquisar"
              style={{ margin: 8 }}
              placeholder="Ex: Young Adults Perspective on Managing Digital Legacy"
              helperText="Digite o nome de um artigo!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                const inputText = e.target.value
                debounce(
                  (inputText: string) => searchPaper({ variables: { props: { title: inputText } } }),
                  inputText,
                  250
                )
              }}
            />
          </div>
          <Box>
            {searchResult?.searchPaper.map((value: any) =>
              <div>
                {value.paper_title}
              </div>
            )}
          </Box>
        </div>
        <div className="w-100 mv4">
          <PapersChart
            data={dataPapers?.getPapersByYear || []}
            handlePaperId={handleCurrentPaper}
            selectedPaper={selectedPaper?.getPaper}
          />
        </div>
        <div className="w-100 mv2">
          <PaperInfo
            paper={selectedPaper?.getPaper}
            loading={loadingSelectedPaper}
            handleCurrentPaper={handleCurrentPaper}
          />
        </div>
      </div>
    </>
  )
}

export default Home
