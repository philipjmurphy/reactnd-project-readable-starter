import React from 'react'
import { connect } from 'react-redux'

import PostForm from './PostForm'

import { postCreate } from '../../actions/posts'

import ErrorState from '../states/ErrorState'

// No PropTypes Required

const PostCreate = ({postCreate, error}) => (
  <div>
    {error && <ErrorState error={error} />}
    <PostForm submitAction={postCreate} />
  </div>
)

const mapStateToProps = ({posts}) => ({
  error: posts.error
})

const mapDispatchToProps = (dispatch, {history}) => ({
  postCreate: () => dispatch(postCreate(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate)
