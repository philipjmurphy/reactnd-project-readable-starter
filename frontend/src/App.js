import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CategoriesPosts from './components/CategoriesPosts'
import CategoryPosts from './components/CategoryPosts'
import PostCreate from './components/post/PostCreate'
import PostUpdate from './components/post/PostUpdate'
import PostDetail from './components/post/PostDetail'

import Header from './components/Header'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blue from 'material-ui/colors/blue'
import green from 'material-ui/colors/green'
import { withTheme, withStyles } from 'material-ui/styles'

import 'typeface-roboto'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green
  }
})

const styles = theme => ({
  root: {
    marginTop: 72 // Leave space for the AppBar.
  }
})

const App = ({classes}) => (
  <MuiThemeProvider theme={theme} >
    <BrowserRouter>
      <div className={classes.root}>
        <Header />
        <Switch>
          <Route exact path="/" component={CategoriesPosts} />
          <Route path="/post/create" component={PostCreate} />
          <Route path="/post/update/:postId" component={PostUpdate} />
          <Route path="/post/:postId" component={PostDetail} />
          <Route path="/:category" component={CategoryPosts} />
        </Switch>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
)

export default withTheme()(withStyles(styles)(App))