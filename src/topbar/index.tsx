import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import HomeRounded from '@material-ui/icons/HomeRounded'
import GitHub from '@material-ui/icons/GitHub'

const TopBar = () => {
  const title = 'Artigos de IHC'

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" href="/">
          <HomeRounded />
        </IconButton>
        <Typography variant="h6" className="flex-grow-1">
          {title}
        </Typography>
        <Button color="inherit" className="mv2 mr2" href="/projeto">
          {'SOBRE O PROJETO'}
        </Button>
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
