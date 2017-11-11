import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getCategories } from '../../actions/categories'
import Loader from '../states/Loader'

import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  row: {
    display: 'flex'
  }
})

const propTypes = {
  category: PropTypes.string
}

class Categories extends Component {

  componentDidMount() {
    this.props.getCategories()
  }

  createCategoryButton(categoryName, path) {
    const {selectedCategory, history} = this.props
    const selectedColor = (!selectedCategory && path === '/') || (selectedCategory === categoryName) ? 'primary' : 'default'

    return (<Button key={categoryName}
      color={selectedColor}
      onClick={() => history.push(path) }>{categoryName}</Button>)
  }

  render() {
    const {categories, isFetching, error, classes} = this.props

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2">
            Categories <Loader items={categories} isFetching={isFetching} error={error} />
          </Typography>

          <div className={classes.row}>
            {this.createCategoryButton('All', '/')}
            {!isFetching && categories.map(category =>
              this.createCategoryButton(category.name, '/' + category.name)
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
}

Categories.propTypes = propTypes

const mapStateToProps = ({categories}, {category, history}) => ({
  selectedCategory: category,
  categories: categories.items,
  isFetching: categories.isFetching,
  error: categories.error,
  history
})

export default withRouter(connect(mapStateToProps, {getCategories})(withStyles(styles)(Categories)))
