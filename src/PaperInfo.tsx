import React, { useState, useEffect } from 'react'
import { PaperInfoResponse, PaperRefsResponse } from './Constants'

interface CustomProps {
  id: number,
  references: PaperInfoResponse
}

const PaperInfo = (props: CustomProps) => {

  const { id } = props

  const [paperInfo, setPaperInfo]: any = useState<PaperInfoResponse>({} as PaperInfoResponse)
  const [paperReferences, setPaperReferences]: any = useState<PaperRefsResponse>({} as PaperRefsResponse)

  const fetchPaperInfo = async () => {
    const PromisePaperInfo = fetch(`/papers/${id}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }).then((response: any) => response.json())

    PromisePaperInfo.then((paperInfo: any) => {
      setPaperInfo(paperInfo)
    })
  }

  // Fetch paper info when receives new paper id
  useEffect(() => {
    if (props.id) {
      fetchPaperInfo()
    }
  }, [props.id])

  useEffect(() => {
    setPaperReferences(props.references)
  }, [props.references])

  return (
    <React.Fragment>
      {paperInfo &&
        <>
          <h2>Paper Info</h2>
          <h4>{paperInfo.title}</h4>
          <span>{paperInfo.abstract_PT}</span>
          <br />
          <br />
          <span>{paperInfo.authors ? paperInfo.authors.map((author: string) => <span><br />{author}</span>) : ''}</span>
          <br />
        </>
      }
      {
        paperReferences &&
        <>
          {paperReferences.cited &&
            <>
              <h2>Cited Papers:</h2>
              <span>{paperReferences.cited.map(([paper_id, paper_title]: [number, string]) => <span><br /><a onClick={() => console.log(paper_id)}>{paper_title}</a></span>)}</span>
            </>
          }
          {paperReferences.citedBy &&
            <>
              <h2>Cited by:</h2>
              <span>{paperReferences.citedBy.map(([paper_id, paper_title]: [number, string]) => <span><br /><a onClick={() => console.log(paper_id)}>{paper_title}</a></span>)}</span>
            </>
          }
        </>
      }
    </React.Fragment>
  )
}

export default PaperInfo