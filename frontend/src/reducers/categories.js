import * as CategoryActionTypes from '../actions/categoryActionTypes'

const categories = (state = {
  items: [],
  isFetching: false,
  error: null
}, action) => {
  switch(action.type) {
    case CategoryActionTypes.CATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case CategoryActionTypes.CATEGORIES_SUCCESS:
      return {
        ...state,
        items: action.categories,
        isFetching: false,
        error: null
      }
    case CategoryActionTypes.CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

export default categories
