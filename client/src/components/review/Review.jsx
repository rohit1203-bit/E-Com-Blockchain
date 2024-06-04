import React from 'react'
import './review.scss'

const Review = ({ idx, current }) => {
  return (
    <article className={`card card-${idx - current}`}>
      <div className="card-content">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas architecto sed officiis distinctio.</p>
        <span>- Reviewer Name</span>
      </div>
    </article>
  )
}

export default Review