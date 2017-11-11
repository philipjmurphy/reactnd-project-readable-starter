import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  save: {
    margin: '0 8px'
  }
})

const propTypes = {
  formName: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  submitMethod: PropTypes.func.isRequired,
  endMethod: PropTypes.func.isRequired
}

const CommentForm = ({submitMethod, endMethod, pristine, isLoading, classes, className}) => (
  <form className={className} onSubmit={e => {e.preventDefault(); submitMethod()}}>
    <Field disabled={isLoading} required placeholder="Leave a comment" name="body" rows="2" cols="50" component="textarea" />

    <button className={classes.save} type="submit" disabled={pristine || isLoading}>Save</button>
    <button className={classes.cancel} type="button" disabled={isLoading} onClick={() => {endMethod()}}>Cancel</button>
  </form>
)

CommentForm.propTypes = propTypes

const mapStateToProps = ({comments}, {formName, comment}) => {
  return {
    form: formName,
    initialValues: comment,
    enableReinitialize: true,
    isLoading: comments.isLoading
  }
}

export default connect(mapStateToProps)(reduxForm()(withStyles(styles)(CommentForm)))