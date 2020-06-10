import React, { useState, useEffect } from 'react'
import PapersChart from './PapersChart'
import PaperInfo from './PaperInfo'
import TextField from '@material-ui/core/TextField'
import ServiceWorker from '../serviceWorker/index'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from 'react-apollo'

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

const Home = () => {
  const handleCurrentPaper = (id: number) => {
    getPaper({ variables: { id: id } })
  }

  const { data: dataPapers } = useQuery(GET_PAPERS_BY_YEAR)
  const [getPaper, { data: selectedPaper, loading: loadingSelectedPaper }] = useLazyQuery(GET_PAPER)

  return (
    <>
      <div className="ma4">
        <div className="flex w-100">
          <form noValidate autoComplete="off" className="w-50">
            <TextField id="outlined-read-only-input" variant="outlined" placeholder="Search..." fullWidth />
          </form>
        </div>
        <div className="w-100 mv4">
          <PapersChart
            data={dataPapers?.getPapersByYear || []}
            handlePaperId={handleCurrentPaper}
            selectedPaper={selectedPaper?.getPaper}
          />
        </div>
        <div className="w-100 mv2">
          <PaperInfo paper={selectedPaper?.getPaper} loading={loadingSelectedPaper} />
        </div>
      </div>
    </>
  )
}

export default Home
