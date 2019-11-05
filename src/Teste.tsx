import React, { useState, useEffect } from 'react'
import PapersChart from './PapersChart'
import PaperInfo from './PaperInfo'

const Teste = () => {

  const [papers, setPapers] = useState({})
  const [currentPaperId, setCurrentPaperId] = useState(null)

  const fetchPapers = async () => {
    const queryGetPapers = await fetch("/papers",
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })

    const PromiseGetPapers = queryGetPapers.json()

    PromiseGetPapers.then((response: any) => {
      console.log('response:', response)
      setPapers(response)
    })
  }

  // When component starts, fetch papers data once
  useEffect(() => {
    fetchPapers()
  }, [])

  return (
    <React.Fragment>
      <div className="flex-row flex">
        <div className='dib w-70'>
          <PapersChart data={papers} handlePaperId={setCurrentPaperId} />
        </div>
        <div className='dib w-30'>
          <PaperInfo id={currentPaperId} />
        </div>
      </div>

    </React.Fragment>)
}

export default Teste
