import { Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { useEffect, useState } from 'react'
import { PaperInfoResponse, PaperRefsResponse } from '../Constants'
import ServiceWorker from '../serviceWorker/index'

interface CustomProps {
  id: number,
  references: PaperInfoResponse
}

const PaperInfo = (props: CustomProps) => {

  const service = ServiceWorker.getInstance()

  const emptyMessage = 'Nothing to show'

  const [loading, setLoading] = useState(false)
  const [paperInfo, setPaperInfo]: any = useState<PaperInfoResponse>({} as PaperInfoResponse)
  const [paperReferences, setPaperReferences]: any = useState<PaperRefsResponse>({} as PaperRefsResponse)

  // Fetch paper info when receives new paper id
  useEffect(() => {
    if (props.id) {
      setLoading(true)
      service.fetchPaperInfo(props.id).then(paperInfo => {
        setPaperInfo({
          ...paperInfo,
          abstract_PT: paperInfo.abstract_PT !== 'NA' ? paperInfo.abstract_PT : null
        })
        setLoading(false)
      })
    }
  }, [props.id])

  useEffect(() => {
    setPaperReferences(props.references)
  }, [props.references])

  return (
    <div className="flex flex-column justify-center ma6">
      {(props.id == undefined || loading) &&
        <>
          {/* Title */}
          <div className="flex-auto w-50 pt2 pb4"><Skeleton variant="text" animation={loading ? 'wave' : false} height={35} /></div>
          <div className="flex flex-row pb5">
            <div className="flex-auto flex-column w-80">
              {/* Abstract */}
              <div className="flex-auto w-20"><Skeleton variant="text" animation={loading ? 'wave' : false} height={30} /></div>
              <div className="flex-auto w-80"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
              <div className="flex-auto w-80"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
              <div className="flex-auto w-80"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
              <div className="flex-auto w-70"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
            </div>
            <div className="flex-auto flex-column w-20">
              {/* Authors */}
              <div className="flex-auto w-60"><Skeleton variant="text" animation={loading ? 'wave' : false} height={30} /></div>
              <div className="flex-auto w-90"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
              <div className="flex-auto w-80"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
              <div className="flex-auto"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
            </div>
          </div>
          {/* Cited */}
          <div className="flex-auto w-20"><Skeleton variant="text" animation={loading ? 'wave' : false} height={30} /></div>
          <div className="flex-auto w-40"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
          <div className="flex-auto w-30"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
          <div className="flex-auto w-40 pb4"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
          {/* Cited By */}
          <div className="flex-auto w-20"><Skeleton variant="text" animation={loading ? 'wave' : false} height={30} /></div>
          <div className="flex-auto w-30"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
          <div className="flex-auto w-40"><Skeleton variant="text" animation={loading ? 'wave' : false} /></div>
        </>
      }
      {!(props.id == undefined) && !loading && paperInfo && paperReferences
        && (
          <>
            <div className="flex-auto pt2 pb4">
              <Typography variant="h5" gutterBottom>{paperInfo.title}</Typography>
            </div>
            <div className="flex flex-row pb5">
              <div className="flex-auto flex-column w-80 pr5">
                <Typography variant="body1" gutterBottom>{paperInfo.abstract_PT}</Typography>
              </div>
              <div className="flex-auto flex-column w-20">
                <Typography variant="button" display="block" gutterBottom>
                  {paperInfo.authors
                    ? paperInfo.authors.map((author: string) => <span className="flex pb2">{author}</span>)
                    : null
                  }
                </Typography>
              </div>
            </div>
            <div className="flex flex-column pb5 w-80">
              <Typography variant="body1" gutterBottom>
                {paperReferences && paperReferences.cited && paperReferences.cited.map(([paper_id, paper_title]: [number, string]) =>
                  <span className="flex pb2">
                    <a onClick={() => console.log(paper_id)}>
                      {paper_title}
                    </a>
                  </span>
                )}
              </Typography>
            </div>
            <div className="flex pb3 w-80">
              <Typography variant="body1" gutterBottom>
                {paperReferences && paperReferences.citedBy && paperReferences.citedBy.map(([paper_id, paper_title]: [number, string]) =>
                  <span className="flex pb2">
                    <a onClick={() => console.log(paper_id)}>
                      {paper_title}
                    </a>
                  </span>
                )}
              </Typography>
            </div>
          </>
        )
      }
    </div>
  )
}

export default PaperInfo