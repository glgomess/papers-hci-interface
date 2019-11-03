import React, { useState, useEffect } from 'react'
import PapersChart from './PapersChart'

const Teste = () => {

  const [papers, setPapers] = useState({})

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
      <div>
        Papers
      </div>
      <div>
        <PapersChart data={papers} />
      </div>
    </React.Fragment>)
}

export default Teste
