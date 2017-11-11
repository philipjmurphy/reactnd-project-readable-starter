import React from 'react'
import PropTypes from 'prop-types'

import WaitingState from './WaitingState'
import ErrorState from './ErrorState'
import EmptyState from './EmptyState'

const propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  emptyState: PropTypes.string
}

const Loader = ({items, isFetching, error, emptyState}) => {
  if(isFetching) {
    return (<WaitingState />)
  }

  if(error) {
    return (<ErrorState error={error} />)
  }

  if(!isFetching && !items.length && !error) {
    return (<EmptyState className={emptyState} />)
  }

  return null
}

Loader.propTypes = propTypes

export default Loader

