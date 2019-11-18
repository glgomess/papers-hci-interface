import React, { useState, useEffect } from 'react'

// TODO: Add props interface, API request response interface

interface PaperInfoResponse {
  abstract_PT: string,
  authors: string[],
  title: string
}

interface PaperRefsResponse {
  cited: Array<Array<number | string>>,
  citedBy:  Array<Array<number | string>>
}

interface PaperData {
  info: PaperInfoResponse,
  references: PaperRefsResponse
}

const PaperInfo = (props: any) => {

  const { id } = props

  const [paperData, setPaperData]: any = useState<PaperData>({} as PaperData)

  const fetchPaperInfo = async () => {
    const PromiseGetPaperInfo = fetch(`/papers/${id}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }).then((response: any) => response.json())

    const PromiseGetPaperReferences = fetch(`/papers/${id}/references`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }).then((response: any) => response.json())

    Promise.all([PromiseGetPaperInfo, PromiseGetPaperReferences]).then((values: any) => {
      const paperInfo: PaperInfoResponse = values[0]
      const paperReferences: PaperRefsResponse = values[1]
      setPaperData({ info: paperInfo, references: paperReferences })
    })
  }

  // Fetch paper info when receives new paper id
  useEffect(() => {
    if (props.id) {
      fetchPaperInfo()
    }
  }, [props.id])

  return (
    <React.Fragment>
      {paperData.info &&
        <>
          <h2>Paper Info</h2>
          <h4>{paperData.info.title}</h4>
          <span>{paperData.info.abstract_PT}</span>
          <br />
          <br />
          <span>{paperData.info.authors ? paperData.info.authors.map((author: string) => <span><br />{author}</span>) : ''}</span>
          <br />
          <h2>Cited Papers:</h2>
          <span>{paperData.references.cited.map(([paper_id, paper_title]: [number, string]) => <span><br /><a onClick={() => console.log(paper_id)}>{paper_title}</a></span>)}</span>
          <h2>Cited by:</h2>
          <span>{paperData.references.citedBy.map(([paper_id, paper_title]: [number, string]) => <span><br /><a onClick={() => console.log(paper_id)}>{paper_title}</a></span>)}</span>
        </>
      }
    </React.Fragment>
  )
}

export default PaperInfo