import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostForm from './PostForm'
import ErrorState from '../states/ErrorState'

import { postDetailsGet, postUpdate } from '../../actions/posts'

import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  notFound: {
    padding: 16
  }
})

// No PropTypes Required

class PostUpdate extends Component {
  componentDidMount() {
    this.props.postDetailsGet()
  }

  render() {
    const { post, postUpdate, error, classes } = this.props

    if(!post) {
      return (<Typography className={classes.notFound} type="headline">This post does not exist.</Typography>)
    }

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

const mapDispatchToProps = (dispatch, {match}) => ({
  postUpdate: () => dispatch(postUpdate()),
  postDetailsGet: () => dispatch(postDetailsGet(match.params.postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostUpdate))
