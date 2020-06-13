import gql from 'graphql-tag'
import React from 'react'
import { useLazyQuery, useQuery } from 'react-apollo'
import PaperInfo from './PaperInfo'
import PapersChart from './PapersChart'
import SearchBar from './SearchBar'

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
    getReferencedByPapers(id: $id) {
      paper_id,
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

  return (
    <>
      <div className="ma4">
        <div className="flex flex-column w-100 mh5">
          <SearchBar
            handleCurrentPaper={handleCurrentPaper}
          />
        </div>
        <div className="w-100 mv4">
          <PapersChart
            data={dataPapers?.getPapersByYear || []}
            handleCurrentPaper={handleCurrentPaper}
            selectedPaper={selectedPaper}
          />
        </div>
        <div className="w-100 mv2">
          <PaperInfo
            paper={selectedPaper}
            loading={loadingSelectedPaper}
            handleCurrentPaper={handleCurrentPaper}
          />
        </div>
      </div>
    </>
  )
}

export default Home
