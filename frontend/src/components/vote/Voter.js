import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'

const styles = theme => ({
  voter: {
    textAlign: 'center',
    color: grey[400],
    fontSize: 18,
    padding: 0,
    minWidth: 32 // Stop buttons moving between single and double digits.
  },
  vote: {
    border: 'none',
    padding: 0,
    background: 'none',
    fontSize: 16,
    color: grey[400],
    '&:active': {
      outline: 'none',
      opacity: 0.5
    },
    '&:hover': {
      color: grey[500]
    }
  }
})

const propTypes = {
  changeVote: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
}

const Voter = ({changeVote, item, disabled, classes}) => (
  <div className={classes.voter}>
    <button className={classes.vote} disabled={disabled} onClick={() => changeVote(item, 'upVote')}>▲</button>
    <div>{item.voteScore}</div>
    <button className={classes.vote} disabled={disabled} onClick={() => changeVote(item, 'downVote')}>▼</button>
  </div>
)

Voter.propTypes = propTypes

export default withStyles(styles)(Voter)
