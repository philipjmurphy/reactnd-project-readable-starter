import React, { Component } from 'react'
import { connect } from 'react-redux'

import Main from './Main'

import { postsGet } from '../actions/posts'

class CategoriesPosts extends Component {

  componentDidMount() {
    this.props.postsGet()
  }

  render = () => (
    <Main />
  )
}

export default connect(null, { postsGet })(CategoriesPosts)
