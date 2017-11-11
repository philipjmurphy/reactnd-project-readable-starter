import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'

import { getCategories } from '../../actions/categories'

import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200
  }
})

const renderSelectField = ({input, meta: { touched, error }, children, ...custom}) => {
  return (<Select displayEmpty
    error={touched && error}
    {...input}
    onChange={(event) => {
      input.onChange(event.target.value)
    }}
    children={children}
    {...custom}
  />)
}

class CategorySelector extends Component {
  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    const { categories, classes } = this.props

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="category">Select a category</InputLabel>

        <Field name="category" component={renderSelectField}>
          {categories && categories.map(category =>
            <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>)
          }
        </Field>
      </FormControl>
    )
  }
}

const mapStateToProps = ({categories}) => ({
  categories: categories.items
})

export default connect(mapStateToProps, { getCategories })(withStyles(styles)(CategorySelector))
