import React, { useState } from 'react'

const Teste = () => {

  const [teste, setTeste] = useState(11)

  const fetchPapers = () => {
    const PromiseGetPapers = fetch("/papers",
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })

    PromiseGetPapers.then((response: any) => {
      console.log('resp', response.json(), response.data)
    })
  }

  return (
    <div>
      MY TEST {teste}

      {fetchPapers()}
    </div>)
}

export default Teste
