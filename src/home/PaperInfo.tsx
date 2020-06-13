import { Card, CardContent, CardHeader, Link, Typography } from '@material-ui/core'
import React from 'react'
import PaperInfoLoading from './PaperInfoLoading'

interface CustomProps {
  paper?: any,
  loading: boolean,
  handleCurrentPaper: Function
}

const PaperInfo = ({ paper, loading, handleCurrentPaper }: CustomProps) => {

  return (
    <Card className="flex flex-column justify-center ma5 pa4">
      <CardHeader
        title="Artigo"
        titleTypographyProps={{
          color: 'textSecondary',
          variant: 'overline',
        }}
      />
      <CardContent>
        {!paper && !loading && (
          <Typography variant="subtitle1" color="textSecondary">
            Nenhum artigo selecionado
          </Typography>
        )}
        {loading && <PaperInfoLoading />}
        {paper && !loading && (
          <>
            <div className="flex-auto pt2 pb4">
              <Typography variant="h4" gutterBottom>
                {paper.getPaper.paper_title}
              </Typography>
            </div>
            <div className="flex flex-row pb3">
              <div className="flex-auto flex-column w-80 pr5">
                <Typography variant="h6" gutterBottom>
                  Resumo
                </Typography>
                {paper.getPaper.paper_abstract_pt ? (
                  <Typography variant="body1" gutterBottom>
                    {paper.getPaper.paper_abstract_pt}
                  </Typography>
                ) : (
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Nenhum
                    </Typography>
                  )}
              </div>
              <div className="flex-auto flex-column w-20">
                <Typography variant="h6" gutterBottom>
                  Autores
                </Typography>
                {paper.getPaper.paper_authors?.length ? (
                  <Typography variant="body1" display="block" gutterBottom>
                    {paper.getPaper.paper_authors.map((author: string) => (
                      <span className="flex pb2">{author}</span>
                    ))}
                  </Typography>
                ) : (
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      Nenhum
                    </Typography>
                  )}
              </div>
            </div>
            <div className="flex flex-column pb3 w-80">
              <Typography variant="h6" gutterBottom>
                Artigos referenciados
              </Typography>
              {paper.getPaper.paper_references?.length ? (
                <Typography variant="body1" gutterBottom>
                  {paper.getPaper.paper_references.map((reference: any, index: any) => (
                    <span key={index} className="flex pb2">
                      {
                        reference.paper_reference_id
                          ? <Link
                            href={`#${reference.paper_reference_id}`}
                            onClick={() => handleCurrentPaper(reference.paper_reference_id)}
                          >
                            {reference.paper_reference}
                          </Link>
                          : <span>{reference.paper_reference}</span>
                      }
                    </span>
                  ))}
                </Typography>
              ) : (
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    Nenhum
                  </Typography>
                )}
            </div>
            <div className="flex flex-column pb3 w-80">
              <Typography variant="h6" gutterBottom>
                Referência em
              </Typography>
              {paper.getReferencedByPapers?.length ? (
                <Typography variant="body1" gutterBottom>
                  {paper.getReferencedByPapers.map((referenceBy: any, index: any) => (
                    <span key={index} className="flex pb2">
                      <Link
                        href={`#${referenceBy.paper_id}`}
                        onClick={() => handleCurrentPaper(referenceBy.paper_id)}
                      >
                        {referenceBy.paper_title}
                      </Link>
                    </span>
                  ))}
                </Typography>
              ) : (
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    Nenhum
                  </Typography>
                )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default PaperInfo
