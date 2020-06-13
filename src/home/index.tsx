import React, { useState, useEffect } from 'react'
import PapersChart from './PapersChart'
import PaperInfo from './PaperInfo'
import TextField from '@material-ui/core/TextField'
import ServiceWorker from '../serviceWorker/index'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from 'react-apollo'
import { debounce } from '../utils/functions'
import { Box, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

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
  const handleCurrentPaper = (paper_id: number | string) => {
    const id = typeof (paper_id) === 'string' ? parseInt(paper_id) : paper_id
    getPaper({ variables: { id: id } })
  }

  const { data: dataPapers } = useQuery(GET_PAPERS_BY_YEAR)
  const [getPaper, { data: selectedPaper, loading: loadingSelectedPaper }] = useLazyQuery(GET_PAPER)
  const [searchPaper, { data: searchResult }] = useLazyQuery(SEARCH_PAPER)

  const [openSearchResults, setOpenSearchResults] = useState<boolean>(false)
  useEffect(() => {
    searchResult?.searchPaper?.length ? setOpenSearchResults(true) : setOpenSearchResults(false)
  }, [searchResult])

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
              onFocus={() => {
                searchResult?.searchPaper?.length && setOpenSearchResults(true)
              }}
              onBlur={() => {
                setTimeout(() => setOpenSearchResults(false), 250)
              }}
            />
          </div>
          {openSearchResults &&
            <div className="relative z-1">
              <div className="absolute ma2">
                <div className="ba b--gray bg-white br3 bw1 pv2">
                  {searchResult?.searchPaper.map((paper: any) =>
                    <div
                      className="flex flex-row bg-animate bg-white hover-bg-light-gray ph3 items-center pointer"
                      onClick={() => {
                        handleCurrentPaper(paper.paper_id)
                        setOpenSearchResults(false)
                      }}
                    >
                      <div className="mr1 flex"><SearchIcon /></div>
                      <Typography>
                        {paper.paper_title}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          }
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
