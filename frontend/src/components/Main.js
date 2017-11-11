import React from 'react'

import Categories from './category/Categories'
import Posts from './post/Posts'

const Main = ({classes, category}) => (
  <div>
    <Categories category={category} />
    <Posts />
  </div>
)

export default Main
