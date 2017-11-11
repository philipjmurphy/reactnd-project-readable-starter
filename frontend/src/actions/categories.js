import * as CategoryActionTypes from './categoryActionTypes'

import Ajax from './'

// GET CATEGORIES
/////////////////
export const getCategories = () => dispatch => {
  dispatch({
    type: CategoryActionTypes.CATEGORIES_REQUEST
  })

  return Ajax.get('categories')
    .then(json => dispatch({
      type: CategoryActionTypes.CATEGORIES_SUCCESS,
      categories: json.categories
    }), error => dispatch({
      type: CategoryActionTypes.CATEGORIES_FAILURE,
      error
    }))
}
