import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import HalfStarIcon from '@material-ui/icons/StarHalf'
import {withStyles} from '@material-ui/core/styles'

const Stars = props => {
  let ratArr = []
  for (let i = 0; i < props.rating; i++) {
    ratArr.push(i)
  }
  console.log(ratArr)
  if (Math.floor(props.rating) === props.rating) {
    return <div>{ratArr.map(idx => <StarIcon key={idx} />)}</div>
  } else {
    return (
      <div>
        {ratArr.map(idx => <StarIcon key={idx} />)}
        <HalfStarIcon />
      </div>
    )
  }
}

export default withStyles()(Stars)
