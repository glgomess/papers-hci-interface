import React, { useState, useEffect } from 'react'
import PapersChart from './PapersChart'
import PaperInfo from './PaperInfo'
import TextField from '@material-ui/core/TextField'
import ServiceWorker from '../serviceWorker/index'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

const GET_PAPERS = gql`
  {
    papers {
      paper_id
      paper_title
      paper_year
    }
  }
`

const Home = () => {
  const service = ServiceWorker.getInstance()

  const [currentPaperRefs, setCurrentPaperRefs] = useState<any>()
  const [currentPaperId, setCurrentPaperId] = useState<number>()

  const handleCurrentPaper = (id: number) => {
    console.log('# handle paper: ', id)
    setCurrentPaperId(id)
    service.getPaperReferences(id).then((paperRefs) => setCurrentPaperRefs(paperRefs))
  }

  const { data: dataPapers } = useQuery(GET_PAPERS)

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
            data={dataPapers ? dataPapers.papers : {}}
            handlePaperId={handleCurrentPaper}
            currentPaperRefs={currentPaperRefs}
          />
        </div>
        <div className="w-100 mv2">
          <PaperInfo id={currentPaperId} references={currentPaperRefs} />
        </div>
      </div>
    </>
  )
}

export default Home
