import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import _ from 'lodash'
import Moment from 'react-moment'

import PostSorter, { postsSort } from './PostSorter'
import Voter from '../vote/Voter'
import Loader from '../states/Loader'

import { changeSortOrder, postChangeVote } from '../../actions/posts'

import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { grey } from 'material-ui/colors'

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  },
  vote: {
    textAlign: 'center',
    width: 40,
    maxWidth: 40
  },
  row: {
    display: 'flex',
  },
  title: {
    paddingLeft: 0
  },
  titleLink: {
    fontSize: 16,
    color: grey[700],
    '&:hover:not([role=button])': {
      color: grey[500]
    }
  },
  time: {
    color: grey[700]
  },
  commentCount: {
    color: grey[500]
  },
  addPost: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 16,
    right: 16
  }
})

// No PropTypes Required

const Posts = ({posts, changeSortOrder, postChangeVote, isFetching, isLoading, error, classes, history}) => (
  <div>
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2">
          Posts <Loader items={posts} isFetching={isFetching} error={error} />
        </Typography>

        {posts.length !== 0 && <Table>
          <PostSorter />
          <TableBody>
            {posts.map(post =>
              <TableRow key={post.id}>
                <TableCell className={classes.vote}>
                  <Voter changeVote={postChangeVote} item={post} disabled={isLoading} />
                  <div className={classes.commentCount}> {post.commentCount} {post.commentCount === 1 ? 'Comment' : 'Comments'}</div>
                </TableCell>
                <TableCell className={classes.title}>
                  <Link className={classes.titleLink} to={'/post/' + post.id}>{post.title}</Link>
                </TableCell>
                <TableCell>
                  <Moment className={classes.time} fromNow>{post.timestamp}</Moment>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>}
      </CardContent>
    </Card>
    <Button onClick={() => history.push('/post/create')} fab color="primary" aria-label="add" className={classes.addPost}>
      <AddIcon />
    </Button>
  </div>
)

const mapStateToProps = ({posts}) => ({
  posts: postsSort(_.map(posts.byId), posts.sortOrder),
  isFetching: posts.isFetching,
  isLoading: posts.isLoading,
  error: posts.error
})

export default withRouter(connect(mapStateToProps, {changeSortOrder, postChangeVote})(withStyles(styles)(Posts)))
