import uuidv4 from 'uuid/v4'

import Ajax from './'

import * as CommentActionTypes from './commentActionTypes'

// COMMENTS GET
///////////////
export const commentsGet = parentId => dispatch => {
  dispatch({
    type: CommentActionTypes.COMMENTS_REQUEST
  })

  return Ajax.get(`posts/${parentId}/comments`)
    .then(comments => dispatch({
      type: CommentActionTypes.COMMENTS_SUCCESS,
      parentId,
      comments
    }), error => dispatch({
      type: CommentActionTypes.COMMENTS_FAILURE,
      error
    }))
}

// COMMENT UPDATE
/////////////////
export const commentUpdateStart = (editCommentId) => ({
  type: CommentActionTypes.COMMENT_UPDATE_START,
  editCommentId
})

export const commentUpdate = (commentId) => (dispatch, getState) => {
  dispatch({
    type: CommentActionTypes.COMMENT_UPDATE_REQUEST
  })

  const comment = getState().form[commentId].values
  const body = {
    timestamp: Date.now(),
    body: comment.body
  }

  return Ajax.put(`comments/${comment.id}`, body)
    .then(comment => dispatch({
      type: CommentActionTypes.COMMENT_UPDATE_SUCCESS,
      comment
    }), error => dispatch({
      type: CommentActionTypes.COMMENT_UPDATE_FAILURE,
      error
    }))
    .then(() => dispatch(commentUpdateEnd))
}

export const commentUpdateEnd = () => ({
  type: CommentActionTypes.COMMENT_UPDATE_END
})

// COMMENT CREATE
/////////////////
export const commentCreateStart = () => ({
  type: CommentActionTypes.COMMENT_CREATE_START
})

export const commentCreate = (post) => (dispatch, getState) => {
  dispatch({
    type: CommentActionTypes.COMMENT_CREATE_REQUEST
  })

  const comment = getState().form.commentCreateForm.values
  const body = {
    id: uuidv4().substring(0, 23).replace(/-/g,""), // 20 character random id
    parentId: post.id,
    timestamp: Date.now(),
    body: comment.body,
    author: 'Mickey Mouse' // TODO Needs to be logged in user
  }

  return Ajax.post('comments', body)
    .then(comment => dispatch({
      type: CommentActionTypes.COMMENT_CREATE_SUCCESS,
      comment
    }), error => dispatch({
      type: CommentActionTypes.COMMENT_CREATE_FAILURE,
      error
    }))
    .then(() => dispatch(commentCreateEnd()))
}

export const commentCreateEnd = () => ({
  type: CommentActionTypes.COMMENT_CREATE_END
})

// COMMENT DELETE
/////////////////
export const commentDelete = (comment) => (dispatch) => {
  dispatch({
    type: CommentActionTypes.COMMENT_DELETE_REQUEST
  })

  return Ajax.delete(`comments/${comment.id}`)
    .then(() => dispatch({
      type: CommentActionTypes.COMMENT_DELETE_SUCCESS,
      comment  // TODO refactor to just pass id - need to do same for delete post...
    }), error => dispatch({
      type: CommentActionTypes.COMMENT_DELETE_FAILURE,
      error
    }))
}

// COMMENT CHANGE VOTE
//////////////////////
export const commentChangeVote = (comment, option) => dispatch => {
  dispatch({
    type: CommentActionTypes.COMMENT_CHANGE_VOTE_REQUEST,
    isFetching: true,
    comment,
    option
  })

  // TODO Should disable the vote buttons until the success vote is triggered.
  return Ajax.post(`comments/${comment.id}`, {option})
    .then(comment => dispatch({
      type: CommentActionTypes.COMMENT_CHANGE_VOTE_SUCCESS,
      isFetching: false,
      comment
    }), error => dispatch({
      type: CommentActionTypes.COMMENT_CHANGE_VOTE_FAILURE,
      error
    }))
}
