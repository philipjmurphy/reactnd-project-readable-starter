import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostForm from './PostForm'
import ErrorState from '../states/ErrorState'

import { postDetailsGet, postUpdate } from '../../actions/posts'

// No PropTypes Required

class PostUpdate extends Component {
  componentDidMount() {
    this.props.postDetailsGet()
  }

  render() {
    const { post, postUpdate, error } = this.props

    return (
      <div>
        {error && <ErrorState error={error} />}
        <PostForm post={post} submitAction={postUpdate} />
      </div>
    )
  }
}

const mapStateToProps = ({posts}, {match}) => ({
  post: posts.byId[match.params.postId],
  error: posts.error
})

const mapDispatchToProps = (dispatch, {history, match}) => ({
  postUpdate: () => dispatch(postUpdate(history)),
  postDetailsGet: () => dispatch(postDetailsGet(match.params.postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostUpdate)
