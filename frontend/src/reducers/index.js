import { combineReducers } from 'redux'
import { reducer as reduxReducer } from 'redux-form'

import categories from './categories'
import posts from './posts'
import comments from './comments'

export default combineReducers({
  categories,
  posts,
  comments,
  form: reduxReducer
})
