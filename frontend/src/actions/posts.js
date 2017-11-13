import uuidv4 from 'uuid/v4'

import * as PostActionTypes from './postActionTypes'

import Ajax from './'

// POSTS GET
////////////
export const postsGet = () => dispatch => {
  dispatch({
    type: PostActionTypes.POSTS_REQUEST
  })

  return Ajax.get('posts').then(posts => dispatch({
    type: PostActionTypes.POSTS_SUCCESS,
    posts
  }), error => dispatch({
    type: PostActionTypes.POSTS_FAILURE,
    error
  }))
}

// POSTS BY CATEGORY GET
////////////////////////
export const postsByCategoryGet = (category) => dispatch => {
  dispatch({
    type: PostActionTypes.POSTS_REQUEST
  })

  return Ajax.get(`${category}/posts`)
    .then(posts => dispatch({
      type: PostActionTypes.POSTS_SUCCESS,
      posts
    }), error => dispatch({
    type: PostActionTypes.POSTS_FAILURE,
    error
  }))
}

// POST DETAILS GET
///////////////////
export const postDetailsGet = (postId) => dispatch => {
  dispatch({
    type: PostActionTypes.POST_DETAILS_REQUEST
  })

  return Ajax.get(`posts/${postId}`)
    .then(post => dispatch({
      type: PostActionTypes.POST_DETAILS_SUCCESS,
      post
    }), error => dispatch({
    type: PostActionTypes.POST_DETAILS_FAILURE,
    error
  }))
}

// POST UPDATE
//////////////
export const postUpdateStart = () => ({
  type: PostActionTypes.POST_UPDATE_START
})

export const postUpdate = () => (dispatch, getState) => {
  dispatch({
    type: PostActionTypes.POST_UPDATE_REQUEST
  })

  const post = getState().form.postForm.values
  const body = {
    title: post.title,
    body: post.body
  }

  return Ajax.put(`posts/${post.id}`, body)
    .then(post => dispatch({
      type: PostActionTypes.POST_UPDATE_SUCCESS,
      post
    }), error => dispatch({
      type: PostActionTypes.POST_UPDATE_FAILURE,
      error
    }))
    .then(() => dispatch(postUpdateEnd()))
    .then(() => window.history.back())
}

export const postUpdateEnd = () => ({
  type: PostActionTypes.POST_UPDATE_END
})

// POST CREATE
//////////////
export const postCreate = (history) => (dispatch, getState) => {
  dispatch({
    type: PostActionTypes.POST_CREATE_REQUEST
  })

  const post = getState().form.postForm.values
  const body = {
    id: uuidv4().substring(0, 23).replace(/-/g,""), // 20 character random id
    timestamp: Date.now(),
    title: post.title,
    body: post.body,
    author: 'Mickey Mouse', // TODO Needs to be logged in user
    category: post.category
  }

  return Ajax.post('posts', body)
    .then(post => dispatch({
      type: PostActionTypes.POST_CREATE_SUCCESS,
      post
    }),
    error => dispatch({
      type: PostActionTypes.POST_CREATE_FAILURE,
      error
    })).then(action => history.push('/post/' + action.post.id))
}

// POST DELETE
//////////////
export const postDelete = (post, history) => (dispatch) => {
  dispatch({
    type: PostActionTypes.POST_DELETE_REQUEST
  })

  return Ajax.delete(`posts/${post.id}`)
    .then(() => dispatch({
      type: PostActionTypes.POST_DELETE_SUCCESS,
      post
    }), error => dispatch({
      type: PostActionTypes.POST_DELETE_FAILURE,
      error
    })).then(() => history.push('/'))
}

// POST CHANGE VOTE
///////////////////
export const postChangeVote = (post, option) => dispatch => {
  dispatch({
    type: PostActionTypes.POST_CHANGE_VOTE_REQUEST,
    post,
    option
  })

  // TODO Should disable the vote buttons until the success vote is triggered.
  return Ajax.post(`posts/${post.id}`, {option})
    .then(post => dispatch({
      type: PostActionTypes.POST_CHANGE_VOTE_SUCCESS,
      post
    }), error => dispatch({
      type: PostActionTypes.POST_CHANGE_VOTE_FAILURE,
      error
    }))
}

// CHANGE SORT ORDER
////////////////////
export const changeSortOrder = sortOrder => ({
  type: PostActionTypes.CHANGE_SORT_ORDER,
  sortOrder
})
