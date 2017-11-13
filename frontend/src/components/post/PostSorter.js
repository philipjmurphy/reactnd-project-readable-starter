import React from 'react'
import { connect } from 'react-redux'

import { changeSortOrder } from '../../actions/posts'

import * as PostActionTypes from '../../actions/postActionTypes'

import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  title: {
    paddingLeft: 0
  }
})

// No PropTypes Required

const PostSorter = ({sortOrder, changeSortOrder, classes}) => (
  <TableHead>
    <TableRow>
      <TableCell>
        {createVoteSortHandler(sortOrder, changeSortOrder)}
      </TableCell>
      <TableCell className={classes.title}>
        Title
      </TableCell>
      <TableCell>
        Author
      </TableCell>
      <TableCell>
        {createTimeSortHandler(sortOrder, changeSortOrder)}
      </TableCell>
      <TableCell>
        Action
      </TableCell>
    </TableRow>
  </TableHead>
)

const createVoteSortHandler = (sortOrder, changeSortOrder) => (
  <TableSortLabel active={sortOrder === PostActionTypes.SORT_BY_VOTE_ASC || sortOrder === PostActionTypes.SORT_BY_VOTE_DESC}
    direction={sortOrder === PostActionTypes.SORT_BY_VOTE_ASC ? 'asc' : 'desc'}
    onClick={() => {
      changeSortOrder(sortOrder === PostActionTypes.SORT_BY_VOTE_ASC ? PostActionTypes.SORT_BY_VOTE_DESC : PostActionTypes.SORT_BY_VOTE_ASC)
    }}>
    Votes
  </TableSortLabel>
)

const createTimeSortHandler = (sortOrder, changeSortOrder) => (
  <TableSortLabel active={sortOrder === PostActionTypes.SORT_BY_TIME_ASC || sortOrder === PostActionTypes.SORT_BY_TIME_DESC}
    direction={sortOrder === PostActionTypes.SORT_BY_TIME_ASC ? 'asc' : 'desc'}
    onClick={() => {
      changeSortOrder(sortOrder === PostActionTypes.SORT_BY_TIME_ASC ? PostActionTypes.SORT_BY_TIME_DESC : PostActionTypes.SORT_BY_TIME_ASC)
    }}>
    Time
  </TableSortLabel>
)

export const postsSort = (posts, sortOrder) => {
  switch(sortOrder) {
    case PostActionTypes.SORT_BY_TIME_ASC:
    default:
      posts = posts.sort((postA, postB) => {
        return postA.timestamp - postB.timestamp
      })
      break;
    case PostActionTypes.SORT_BY_TIME_DESC:
      posts = posts.sort((postA, postB) => {
        return postB.timestamp - postA.timestamp
      })
      break;
    case PostActionTypes.SORT_BY_VOTE_ASC:
      posts = posts.sort((postA, postB) => {
        return postA.voteScore - postB.voteScore
      })
      break;
    case PostActionTypes.SORT_BY_VOTE_DESC:
      posts = posts.sort((postA, postB) => {
        return postB.voteScore - postA.voteScore
      })
      break;
  }

  return posts
}

const mapStateToProps = ({posts}) => ({
  sortOrder: posts.sortOrder
})

export default connect(mapStateToProps, {changeSortOrder})(withStyles(styles)(PostSorter))
