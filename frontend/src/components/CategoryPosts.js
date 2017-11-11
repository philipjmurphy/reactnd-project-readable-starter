import React, { Component } from 'react'

import { connect } from 'react-redux'

import Main from './Main'

import { postsByCategoryGet } from '../actions/posts'

class CategoryPosts extends Component {

  componentDidMount() {
    this.postsByCategoryGet()
  }

  componentDidUpdate(prevProps) { // Need to reload posts as category is changed.
    if(prevProps.category !== this.props.match.params.category) {
      this.postsByCategoryGet()
    }
  }

  postsByCategoryGet() {
    this.props.postsByCategoryGet(this.props.category)
  }

  render = () => (
    <Main category={this.props.category} />
  )
}

const mapStateToProps = (state, {match}) => ({
  category: match.params.category
})

export default connect(mapStateToProps, {postsByCategoryGet})(CategoryPosts)
