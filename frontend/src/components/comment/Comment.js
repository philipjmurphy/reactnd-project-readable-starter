import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Moment from 'react-moment'

import * as commentActions from '../../actions/comments'

import CommentForm from './CommentForm'
import Voter from '../vote/Voter'

import Typography from 'material-ui/Typography'

import Flex from 'flexbox-react'

import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  },
  edit: {
    marginRight: 8
  },
  author: {
    fontStyle: 'italic',
    fontSize: 14
  },
  time: {
    fontSize: 12
  },
  voter: {
    fontSize: 14
  }
})

const propTypes = {
  comment: PropTypes.object.isRequired
}

const Comment = ({comment, editCommentId, commentChangeVote, commentUpdateStart, commentUpdateEnd, commentDelete, commentUpdate, isLoading, classes}) => (
  <Flex>
    <Flex flexDirection="column" justifyContent="center" alignItems="flex-start" minWidth="48px">
      <Voter classes={{voter: classes.voter}} changeVote={commentChangeVote} item={comment} disabled={isLoading} />
    </Flex>

    {comment.id !== editCommentId &&
    <Flex flexDirection="column" flexGrow={1}>
      <Flex flexDirection="column">
        <Flex flexDirection="column">
          <Flex alignSelf="flex-start" justifyContent="flex-start">
            <Typography type="body1">
              {comment.body}
            </Typography>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between">
          <Flex>
            <button className={classes.edit} disabled={isLoading} onClick={() => commentUpdateStart(comment.id)}>Edit</button>
            <button disabled={isLoading} onClick={() => commentDelete(comment)}>Delete</button>

          </Flex>
          <Flex flexDirection="column" alignSelf="center" alignItems="flex-end">
            <div className={classes.author}>{comment.author}</div>
            <div className={classes.time}><Moment fromNow>{comment.timestamp}</Moment></div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
    }

    {/* Inline Comment Edit */}
    {comment.id === editCommentId &&
      <CommentForm
        formName={editCommentId}
        comment={comment}
        submitMethod={() => commentUpdate(editCommentId)}
        endMethod={commentUpdateEnd} />
    }
  </Flex>
)

Comment.propTypes = propTypes

const mapStateToProps = ({comments, posts}) => ({
  editCommentId: comments.editCommentId,
  isLoading: comments.isLoading || posts.isLoading
})

const mapDispatchToProps = (dispatch) => bindActionCreators({...commentActions}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Comment))