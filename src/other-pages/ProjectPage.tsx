import { Avatar, makeStyles, Typography, Link } from '@material-ui/core'
import React from 'react'
import IconDesignChart from './IconDesignChart'
import IconDesignDetails from './IconDesignDetails'
import IconDesignSearch from './IconDesignSearch'

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
        <Typography variant="body1">
          O objetivo deste projeto é apoiar a busca e citação de artigos da comunidade brasileira de IHC (Interação Humano-Computador), em particular artigos completos publicados no Simpósio Brasileiro sobre Fatores Humanos em Sistemas Computacionais. Para isto, foi desenvolvida essa ferramenta para buscar e visualizar um conjunto de artigos e suas citações. O público alvo do projeto são professores, pesquisadores e alunos que contribuem mais ativamente na produção de artigos acadêmicos e precisam encontrar outros artigos para referenciar em seus projetos.
        </Typography>
      </div>
      <div className="flex flex-row justify-between ml5 mr6 mt3">
        <IconDesignSearch height={400} width={400} />
        <IconDesignChart height={400} width={400} />
        <IconDesignDetails height={400} width={400} />
      </div>
      <div className="flex flex-column">
        <div className="flex flex-row items-center mt3">
          <Avatar alt="Gabriela Gutierrez" src="https://github.com/gabibguti.png" className={classes.large} />
          <div className="flex flex-column ml3">
            <Typography variant="overline">
              Gabriela Gutierrez
          </Typography>
            <Typography variant="caption">
              Estudante de Engenharia da Computação na PUC-Rio.
          </Typography>
          </div>
        </div>
        <div className="flex flex-row items-center mt3">
          <Avatar alt="Simone D J Barbosa" src="http://www-di.inf.puc-rio.br/~simone/images/SimoneDJBarbosa150.jpg" className={classes.large} />
          <div className="flex flex-column ml3">
            <Typography variant="overline">
              Simone D J Barbosa
          </Typography>
            <Typography variant="caption">
              Professora do Departamento de Informática da PUC-Rio.
          </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
