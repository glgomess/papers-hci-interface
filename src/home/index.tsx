import React, { useState, useEffect } from 'react'
import PapersChart from './PapersChart'
import PaperInfo from './PaperInfo'
import { PaperRefsResponse } from '../Constants'
import TextField from '@material-ui/core/TextField'
import ServiceWorker from '../serviceWorker/index'

const Home = () => {

  const service = ServiceWorker.getInstance()

  const [papers, setPapers] = useState({})
  const [currentPaperRefs, setCurrentPaperRefs] = useState()
  const [currentPaperId, setCurrentPaperId] = useState()


  const handleCurrentPaper = (id: number) => {
    console.log('# handle paper: ', id)
    setCurrentPaperId(id)
    service.getPaperReferences(id).then(paperRefs => setCurrentPaperRefs(paperRefs))
  }

  // When component starts, fetch papers data once
  useEffect(() => {
    service.getPapers().then(papers => setPapers(papers))
  }, [])

  return (
    <>
      <div className="ma4">
        <div className="flex w-100">
          <form noValidate autoComplete="off" className="w-50">
            <TextField
              id="outlined-read-only-input"
              variant="outlined"
              placeholder="Search..."
              fullWidth
            />
          </form>
        </div>
        <div className='w-100 mv4'>
          <PapersChart data={papers} handlePaperId={handleCurrentPaper} currentPaperRefs={currentPaperRefs} />
        </div>
        <div className='w-100 mv2'>
          <PaperInfo id={currentPaperId} references={currentPaperRefs} />
        </div>
      </div>
    </>)
}

export default Home
