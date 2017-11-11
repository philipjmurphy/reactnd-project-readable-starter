import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'

import { commentsGet, commentCreateStart } from '../../actions/comments'

import Comment from './Comment'
import AddComment from './AddComment'
import Loader from '../states/Loader'

import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'

import { withStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'

const styles = theme => ({
  divider: {
    margin: '8px 0',
    color: grey[300]
  },
  comment: {
    marginTop: 144
  },
  emptyState: {
    display: 'none'
  }
})

const propTypes = {
  post: PropTypes.object.isRequired
}

class Comments extends Component {

  componentDidMount() {
    this.props.commentsGet(this.props.post.id)
  }

  render() {
    const {comments, post, isAddingComment, commentCreateStart, isFetching, error, classes} = this.props

    return (
      <div>
        {comments.length > 0 &&
          <Typography type="subheading" gutterBottom>
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </Typography>
        }

        {!isAddingComment && <Loader emptyState={classes.emptyState} items={comments} isFetching={isFetching} error={error} />}
        {!isFetching && comments.length !== 0 && comments.map(comment =>
          <div key={comment.id}>
            <Comment comment={comment} />
            <Divider className={classes.divider} />
          </div>
        )}

        {isAddingComment ?
          <AddComment className={classes.comment} post={post} /> :
          (!isFetching ? <Button color="primary" onClick={() => commentCreateStart()}>Add Comment</Button>: '')}
      </div>
    )
  }
}

Comments.propTypes = propTypes

const mapStateToProps = ({comments, posts}) => ({
  comments: _.orderBy(_.filter(_.map(comments.byId), ['deleted', false]), ['voteScore'], ['desc']),
  isAddingComment: comments.isAddingComment,
  isFetching: comments.isFetching,
  error: comments.error
})

export default connect(mapStateToProps, { commentsGet, commentCreateStart })(withStyles(styles)(Comments))