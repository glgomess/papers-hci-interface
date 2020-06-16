import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import HomeRounded from '@material-ui/icons/HomeRounded'
import GitHub from '@material-ui/icons/GitHub'
import { Link } from "react-router-dom";

const TopBar = () => {
  const title = 'Artigos de IHC'

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className="link white">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <HomeRounded />
          </IconButton>
        </Link>
        <Typography variant="h6" className="flex-grow-1">
          {title}
        </Typography>
        <Link to="/projeto" className="link white">
          <Button color="inherit" className="mv2 mr2">
            {'SOBRE O PROJETO'}
          </Button>
        </Link>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => console.log('go to github repo')}
          color="inherit"
          href="https://github.com/gabibguti/papers-ihc-interface"
          target="_blank"
          edge="end"
        >
          <GitHub />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
