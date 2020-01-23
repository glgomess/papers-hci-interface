import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import GitHub from '@material-ui/icons/GitHub'

const TopBar = () => {

  const title = "IHC Papers"

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="w-100">
          {title}
        </Typography>
        <div className="flex justify-end w-100">
          <Button color="inherit" className="mv2 mr2">
            {"ABOUT"}
          </Button>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => console.log('go to github repo')}
            color="inherit"
            href="https://github.com/gabibguti/papers-ihc-interface"
            target="_blank"
          >
            <GitHub />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar