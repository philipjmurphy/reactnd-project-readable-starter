import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as commentActions from '../../actions/comments'

import CommentForm from './CommentForm'

import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  form: {
    marginTop: 16
  }
})

const propTypes = {
  post: PropTypes.object.isRequired
}

const AddComment = ({ post, commentCreate, commentCreateEnd, classes }) => (
  <CommentForm className={classes.form}
    formName="commentCreateForm"
    comment={{body: ''}}
    submitMethod={() => commentCreate(post)}
    endMethod={commentCreateEnd}/>
)

AddComment.propTypes = propTypes

const mapDispatchToProps = (dispatch) => bindActionCreators({...commentActions}, dispatch)

export default connect(null, mapDispatchToProps)(withStyles(styles)(AddComment))