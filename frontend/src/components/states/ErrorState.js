import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  error: PropTypes.object.isRequired
}

const ErrorState = ({error}) => (
  <div>{error.message}</div>
)

ErrorState.propTypes = propTypes

export default ErrorState
