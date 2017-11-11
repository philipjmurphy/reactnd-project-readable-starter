import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Moment from 'react-moment'

import {postDetailsGet, postChangeVote, postDelete} from '../../actions/posts'

import Comments from '../comment/Comments'
import ErrorState from '../states/ErrorState'
import Voter from '../vote/Voter'

import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'

import Flex from 'flexbox-react'
import Chip from 'material-ui/Chip'

import { blue } from 'material-ui/colors'

import { withStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  },
  chip: {
    backgroundColor: blue[500],
    color: 'white'
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
  divider: {
    margin: '8px 0',
    color: grey[500]
  }
})

// No PropTypes Required

class PostDetail extends Component {

  componentDidMount() {
    this.props.postDetailsGet(this.props.match.params.postId)
  }

  render() {
    const {post, postChangeVote, postDelete, isLoading, error, classes} = this.props

    if(!post) return null

    return (
      <Card className={classes.card}>
        <CardContent>
          {error && <ErrorState error={error} />}

          <Flex>
            <Flex flexDirection="column" justifyContent="center" alignItems="flex-start" minWidth="48px">
              <Voter changeVote={postChangeVote} item={post} disabled={isLoading} />
            </Flex>
            <Flex flexDirection="column" flexGrow={1}>
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <Flex  justifyContent="space-between">
                    <Typography type="title">
                      {post.title}
                    </Typography>

                    <Chip classes={{root: classes.chip}} label={post.category}></Chip>
                  </Flex>
                  <Flex alignSelf="flex-start" justifyContent="flex-start" padding="16px 0">
                    <Typography type="body1">
                      {post.body}
                    </Typography>
                  </Flex>
                </Flex>
                <Flex justifyContent="space-between">
                  <Flex alignItems="flex-start">
                    <Link className={classes.edit} disabled={isLoading} to={'/post/update/' + post.id}>Edit</Link>
                    <button disabled={isLoading} onClick={() => postDelete(post)}>Delete</button>
                  </Flex>
                  <Flex flexDirection="column" alignSelf="center" alignItems="flex-end">
                    <div className={classes.author}>{post.author}</div>
                    <div className={classes.time}><Moment fromNow>{post.timestamp}</Moment></div>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Divider className={classes.divider} />

          <Comments post={post} />

        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = ({posts, comments}, {match}) => {
  const post = posts.byId[match.params.postId]

  return {
    post,
    comments,
    initialValues: post,
    enableReinitialize: true,
    isEditing: posts.isEditing,
    isLoading: posts.isLoading || comments.isLoading,
    error: posts.error || comments.error
  }
}

const mapDispatchToProps = (dispatch, {history}) => ({
  postDelete: (post) => dispatch(postDelete(post, history)),
  postChangeVote: (post, option) => dispatch(postChangeVote(post, option)),
  postDetailsGet: (postId) => dispatch(postDetailsGet(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostDetail))
