import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import CategorySelector from '../category/CategorySelector'

import Flex from 'flexbox-react'

import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'

import { withStyles } from 'material-ui/styles'
import { blue } from 'material-ui/colors'

const styles = theme => ({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingRight: 16
  },
  field: {
    padding:  4,
    marginBottom: 16
  },
  chip: {
    backgroundColor: blue[500],
    color: 'white'
  }
})

const propTypes = {
  post: PropTypes.object,
  submitAction: PropTypes.func.isRequired
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'category'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

const PostForm = ({handleSubmit, submitAction, post, pristine, isLoading, classes}) => (
  <form onSubmit={handleSubmit(submitAction)}>
    <Flex padding="16px">
      <Flex className={classes.title} flexDirection="column">
        Title
      </Flex>
      <Flex flexDirection="column" flexGrow={1}>
        <Field className={classes.field} disabled={isLoading} required placeholder="Snappy and to the point" name="title" component="input" />
        <Field className={classes.field} disabled={isLoading} required placeholder="Tell us something interesting..." name="body" rows="10" component="textarea"  />

        <Flex alignItems="center" justifyContent="space-between">
          <Flex>
            <Button raised color="primary" className={classes.button} type="submit" disabled={pristine || isLoading}>Save</Button>
            <Button dense type="button" disabled={isLoading} onClick={() => window.history.back()}>Cancel</Button>
          </Flex>
          <Flex alignItems="center">
            {post ? <Chip classes={{root: classes.chip}} label={post.category}></Chip> : <CategorySelector />}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </form>
)

PostForm.propTypes = propTypes

const mapStateToProps = ({posts}, {post}) => ({
  initialValues: post,
  isLoading: posts.isLoading
})

export default connect(mapStateToProps)(
  reduxForm({
    form: 'postForm',
    validate
  })(withStyles(styles)(PostForm)))