import { Typography, Link, Card, CardHeader, CardContent } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { useEffect, useState } from 'react'
import ServiceWorker from '../serviceWorker/index'

interface CustomProps {
  id?: number,
  references: PaperInfoResponse
}

const PaperInfo = (props: CustomProps) => {

  const service = ServiceWorker.getInstance()

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
    <Card className="flex flex-column justify-center ma5 pa4">
      <CardHeader
        title="Artigo"
        titleTypographyProps={{
          color: "textSecondary",
          variant: "overline"
        }}
      />
      <CardContent>
        {
          props.id == undefined &&
          <Typography variant="subtitle1" color="textSecondary">Nenhum artigo selecionado</Typography>
        }
        {loading &&
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
                <Typography variant="h4" gutterBottom>{paperInfo.title}</Typography>
              </div>
              <div className="flex flex-row pb3">
                <div className="flex-auto flex-column w-80 pr5">
                  <Typography variant="h6" gutterBottom>Resumo</Typography>
                  {paperInfo.abstract_PT
                    ? <Typography variant="body1" gutterBottom>{paperInfo.abstract_PT}</Typography>
                    : <Typography variant="body1" color="textSecondary" gutterBottom>Nenhum</Typography>
                  }
                </div>
                <div className="flex-auto flex-column w-20">
                  <Typography variant="h6" gutterBottom>Autores</Typography>
                  {paperInfo.authors
                    && paperInfo.authors.length
                    ? <Typography variant="body1" display="block" gutterBottom>
                      {paperInfo.authors.map((author: string) => <span className="flex pb2">{author}</span>)}
                    </Typography>
                    : <Typography variant="body1" color="textSecondary" gutterBottom>Nenhum</Typography>
                  }
                </div>
              </div>
              <div className="flex flex-column pb3 w-80">
                <Typography variant="h6" gutterBottom>Artigos referenciados</Typography>
                {paperReferences.cited
                  && paperReferences.cited.length
                  ? <Typography variant="body1" gutterBottom>
                    {paperReferences.cited.map(([paper_id, paper_title]: [number, string]) =>
                      <span key={paper_id} className="flex pb2">
                        <Link href={`#${paper_id}`} onClick={() => console.log(paper_id)}>
                          {paper_title}
                        </Link>
                      </span>
                    )}
                  </Typography>
                  : <Typography variant="body1" color="textSecondary" gutterBottom>Nenhum</Typography>
                }
              </div>
              <div className="flex flex-column pb3 w-80">
                <Typography variant="h6" gutterBottom>Referência em</Typography>
                {paperReferences.citedBy
                  && paperReferences.citedBy.length
                  ? <Typography variant="body1" gutterBottom>
                    {paperReferences.citedBy.map(([paper_id, paper_title]: [number, string]) =>
                      <span key={paper_id} className="flex pb2">
                        <Link href={`#${paper_id}`} onClick={() => console.log(paper_id)}>
                          {paper_title}
                        </Link>
                      </span>
                    )}
                  </Typography>
                  : <Typography variant="body1" color="textSecondary" gutterBottom>Nenhum</Typography>
                }
              </div>
            </>
          )
        }
      </CardContent>
    </Card>
  )
}

export default PaperInfo