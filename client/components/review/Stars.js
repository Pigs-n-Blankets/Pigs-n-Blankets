import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import HalfStarIcon from '@material-ui/icons/StarHalf'
import {withStyles} from '@material-ui/core/styles'

const Stars = props => {
  let rating = props.rating * 10
  let ratArr = []
  for (let i = 0; i < props.rating; i++) {
    ratArr.push(i)
  }
  console.log(ratArr.length)
  if (Number(rating.toString()[1]) < 5 && rating > 9) {
    return <div>{ratArr.map(idx => <StarIcon key={idx} />)}</div>
  } else {
    return (
      <div>
        {ratArr.slice(0, -1).map(idx => <StarIcon key={idx} />)}
        <HalfStarIcon />
      </div>
    )
  }
}

export default withStyles()(Stars)
