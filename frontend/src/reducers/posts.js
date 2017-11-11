import _ from 'lodash'

import * as PostActionTypes from '../actions/postActionTypes'
import * as CommentActionTypes from '../actions/commentActionTypes'

const posts = (state = {
  byId: {},
  sortOrder: PostActionTypes.SORT_BY_VOTE_DESC,
  isEditing: false,
  isFetching: false, // Async list of data loading
  isLoading: false, // Async action
  error: null
}, action) => {
  switch(action.type) {
    case PostActionTypes.POSTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case PostActionTypes.POSTS_SUCCESS:
      return {
        ...state,
        byId: _.mapKeys(action.posts, 'id'),
        isFetching: false,
        error: null
      }
    case PostActionTypes.POSTS_FAILURE:
      return failureAction(state, action)
    case PostActionTypes.POST_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case PostActionTypes.POST_DETAILS_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: {
            ...action.post
          }
        },
        isFetching: false,
        error: null
      }
    case PostActionTypes.POST_DETAILS_FAILURE:
      return failureAction(state, action)
    case PostActionTypes.POST_CHANGE_VOTE_REQUEST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: {
            ...state.byId[action.post.id],
            voteScore: action.option === 'upVote' ? action.post.voteScore + 1 : action.post.voteScore - 1
          }
        },
        isLoading: true
      }
    case PostActionTypes.POST_CHANGE_VOTE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: {
            ...state.byId[action.post.id],
            voteScore: action.post.voteScore
          }
        },
        isLoading: false,
        error: null
      }
    case PostActionTypes.POST_CHANGE_VOTE_FAILURE:
      return failureAction(state, action)
    case PostActionTypes.CHANGE_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.sortOrder
      }
    case PostActionTypes.POST_UPDATE_START:
      return {
        ...state,
        isEditing: true
      }
    case PostActionTypes.POST_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PostActionTypes.POST_UPDATE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: {
            ...state.byId[action.post.id],
            body: action.post.body,
            timestamp: action.post.timestamp
          }
        },
        isLoading: false,
        error: null
      }
    case PostActionTypes.POST_UPDATE_FAILURE:
      return failureAction(state, action)
    case PostActionTypes.POST_UPDATE_END:
      return {
        ...state,
        isEditing: false
      }
    case PostActionTypes.POST_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PostActionTypes.POST_CREATE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: {
            ...action.post
          }
        },
        isLoading: false,
        error: null
      }
    case PostActionTypes.POST_CREATE_FAILURE:
      return failureAction(state, action)
    case PostActionTypes.POST_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PostActionTypes.POST_DELETE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: {
            ...state.byId[action.post.id],
            deleted: true
          }
        },
        isLoading: false,
        error: null
      }
    case PostActionTypes.POST_DELETE_FAILURE:
      return failureAction(state, action)
    case CommentActionTypes.COMMENT_CREATE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.parentId]: {
            ...state.byId[action.comment.parentId],
            commentCount: state.byId[action.comment.parentId].commentCount + 1
          }
        }
      }
    case CommentActionTypes.COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.parentId]: {
            ...state.byId[action.comment.parentId],
            commentCount: state.byId[action.comment.parentId].commentCount - 1
          }
        }
      }
    default:
      return state
  }
}

const failureAction = (state, action) => ({
  ...state,
  isFetching: false,
  isLoading: false,
  error: action.error
})

export default posts