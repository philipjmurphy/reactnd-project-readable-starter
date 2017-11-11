import * as CommentActionTypes from '../actions/commentActionTypes'
import * as PostActionTypes from '../actions/postActionTypes'

import _ from 'lodash'

const comments = (state = {
  byId: {},
  isFetching: false, // Async list of data loading
  isLoading: false, // Async action
  isAddingComment: false,
  error: null
}, action) => {
  switch(action.type) {
    case CommentActionTypes.COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAddingComment: false
      }
    case CommentActionTypes.COMMENTS_SUCCESS:
      return {
        ...state,
        byId: _.mapKeys(action.comments, 'id'),
        isFetching: false,
        error: null
      }
    case CommentActionTypes.COMMENTS_FAILURE:
      return failureAction(state, action)
    case CommentActionTypes.COMMENT_CHANGE_VOTE_REQUEST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: {
            ...state.byId[action.comment.id],
            voteScore: action.option === 'upVote' ? action.comment.voteScore + 1 : action.comment.voteScore - 1
          }
        },
        isLoading: true
      }
    case CommentActionTypes.COMMENT_CHANGE_VOTE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: {
            ...state.byId[action.comment.id],
            voteScore: action.comment.voteScore
          }
        },
        isLoading: false,
        error: null
      }
    case CommentActionTypes.COMMENT_CHANGE_VOTE_FAILURE:
      return failureAction(state, action)
    case CommentActionTypes.COMMENT_UPDATE_START:
      return {
        ...state,
        editCommentId: action.editCommentId
      }
    case CommentActionTypes.COMMENT_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CommentActionTypes.COMMENT_UPDATE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: {
            ...state.byId[action.comment.id],
            body: action.comment.body,
            timestamp: action.comment.timestamp
          }
        },
        editCommentId: null,
        isLoading: false,
        error: null
      }
    case CommentActionTypes.COMMENT_UPDATE_FAILURE:
      return failureAction(state, action)
    case CommentActionTypes.COMMENT_UPDATE_END:
      return {
        ...state,
        editCommentId: null
      }
    case CommentActionTypes.COMMENT_CREATE_START:
      return {
        ...state,
        isAddingComment: true
      }
    case CommentActionTypes.COMMENT_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CommentActionTypes.COMMENT_CREATE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: {
            ...action.comment
          }
        },
        isLoading: false,
        error: null
      }
    case CommentActionTypes.COMMENT_CREATE_FAILURE:
      return failureAction(state, action)
    case CommentActionTypes.COMMENT_CREATE_END:
      return {
        ...state,
        isAddingComment: false
      }
      case PostActionTypes.POST_DELETE_SUCCESS:
        return {
          ...state,
          byId: {} // Post deleted, so clear out comments.
        }
    case CommentActionTypes.COMMENT_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CommentActionTypes.COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: {
            ...state.byId[action.comment.id],
            deleted: true
          }
        },
        isLoading: false,
        error: null
      }
    case CommentActionTypes.COMMENT_DELETE_FAILURE:
      return failureAction(state, action)
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

export default comments