import React, { useState, useEffect } from 'react'

// TODO: Add props interface, API request response interface

interface PaperData {
  abstract_PT: string,
  authors: string[],
  title: string
}

const PaperInfo = (props: any) => {

  console.log('props paperinfo:', props)

  const { id } = props

  const [paperData, setPaperData]: any = useState({} as PaperData)

  const fetchPaperInfo = async () => {
    const queryGetPaperInfo = await fetch(`/papers/${id}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })

    const PromiseGetPaperInfo = queryGetPaperInfo.json()

    PromiseGetPaperInfo.then((response: any) => {
      console.log('response:', response)
      setPaperData(response)
    })
  }

  // Fetch paper info when receives new paper id
  useEffect(() => {
    if (props.id) {
      fetchPaperInfo()
    }
  }, [props.id])

  return (
    <div>
      <h2>Paper Info</h2>
      <h4>{paperData.title}</h4>
      <span>{paperData.abstract_PT}</span>
      <br />
      <br />
      <span>{paperData.authors ? paperData.authors.map((author: string) => <span><br />{author}</span>) : ''}</span>
    </div>
  )
}

export default PaperInfo