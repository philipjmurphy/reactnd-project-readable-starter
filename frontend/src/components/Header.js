import React from 'react'
import { withRouter } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'

const Header = ({history}) => (
  <AppBar position="fixed" >
    <Toolbar>
      <IconButton onClick={() => history.push('/')} color="contrast" aria-label="Home">
        <HomeIcon />
      </IconButton>
      <Typography type="title" color="inherit">
        Readable
      </Typography>
    </Toolbar>
  </AppBar>
)

export default withRouter(Header)
