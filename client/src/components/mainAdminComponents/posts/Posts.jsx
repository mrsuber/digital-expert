import React from 'react'
import './posts.css'
const Posts = ({posts,loading}) => {
  if(loading){
    return <h2>Loading...</h2>
  }

  return (
    <ul className="posts__container list-group">
    {posts.map(post =>(
      <li key={post.id} className="posts__list_group_item">
      {post.title}
      </li>
    ))}
    </ul>
  )
}

export default Posts
