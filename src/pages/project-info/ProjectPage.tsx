import { Avatar, makeStyles, Typography, Link } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const TECHNOLOGIES = [
  {
    label: "Elasticsearch",
    img_src: "https://img.icons8.com/color/50/000000/elasticsearch.png"
  },
  {
    label: "Docker",
    img_src: "https://img.icons8.com/color/50/000000/docker.png"
  },
  {
    label: "React",
    img_src: "https://img.icons8.com/wired/64/000000/react.png"
  },
]

const CONTRIBUITORS = [
  {
    name: "Gabriela Gutierrez",
    resume: "Estudante de Engenharia da Computação na PUC-Rio.",
    profile_src: "https://www.linkedin.com/in/gabriela-gutierrez-4213b0178/",
    img_src: "https://github.com/gabibguti.png"
  },
  {
    name: "Livia Aloise",
    resume: "Estudante de Engenharia da Computação na PUC-Rio.",
    profile_src: "https://www.linkedin.com/in/livia-aloise-85576a17a/",
    img_src: "https://github.com/liviaaloise.png"
  },
  {
    name: "Simone D J Barbosa",
    resume: "Professora do Departamento de Informática da PUC-Rio.",
    img_src: "http://www-di.inf.puc-rio.br/~simone/images/SimoneDJBarbosa150.jpg"
  },
]

const ProjectPage = () => {
  const classes = useStyles()

  return (
    <div className="ma4">
      <div className="flex flex-column">
        <Typography variant="h4" gutterBottom>
          Sobre o projeto
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Projeto de visualização e busca de artigos
        </Typography>
        <Typography variant="body1" gutterBottom>
          O objetivo deste projeto é apoiar a busca e citação de artigos da comunidade brasileira de IHC (Interação Humano-Computador), em particular artigos completos publicados no Simpósio Brasileiro sobre Fatores Humanos em Sistemas Computacionais. Para isto, foi desenvolvida essa ferramenta para buscar e visualizar um conjunto de artigos e suas citações. O público alvo do projeto são professores, pesquisadores e alunos que contribuem mais ativamente na produção de artigos acadêmicos e precisam encontrar outros artigos para referenciar em seus projetos.
        </Typography>
        <Typography variant="subtitle1" gutterBottom className="mt4">
          Tecnologia utilizada
        </Typography>
        <div className="flex flex-row mt3">
          {
            TECHNOLOGIES.map(({ label, img_src }) =>
              <div className="flex flex-row items-center mr4">
                <Avatar src={img_src} className={classes.small} />
                <div className="flex flex-column ml2">
                  <Typography variant="subtitle2">
                    {label}
                  </Typography>
                </div>
              </div>
            )
          }
        </div>
        <Typography variant="subtitle1" gutterBottom className="mt4">
          Contribuidores
        </Typography>
        {
          CONTRIBUITORS.map(({ name, resume, profile_src, img_src }) =>
            <div className="flex flex-row items-center mt3">
              <Avatar alt={name} src={img_src} className={classes.large} />
              <div className="flex flex-column ml3">
                <Link href={profile_src} variant="overline" target="_blank" color="inherit">
                  {name}
                </Link>
                <Typography variant="caption">
                  {resume}
                </Typography>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ProjectPage
