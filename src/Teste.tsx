import React, { useState } from 'react'
import PapersChart from './PapersChart'

const Teste = () => {

  const [teste, setTeste] = useState(11)

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
    })
  }

  fetchPapers()

  return (
    <React.Fragment>
      <div>
        MY TEST {teste}
      </div>
      <div>
        <PapersChart />
      </div>
    </React.Fragment>)
}

export default Teste
