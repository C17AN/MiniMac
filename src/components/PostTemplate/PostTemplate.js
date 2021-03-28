import React from "react"
import "../../styles/pages/Note.scss"
import "./PostTemplate.scss"
import TopButton from "../../components/TopButton/TopButton"
import PostContent from "../PostContent/PostContent"

const PostTemplate = ({ children, classAlias, innerHeight, innerWidth }) => {
  return (
    <div className={`post-container ${classAlias}`}>
      <div className="post-top">
        <TopButton />
      </div>
      <PostContent innerHeight={innerHeight} innerWidth={innerWidth}>
        {children}
      </PostContent>
    </div>
  )
}

export default PostTemplate
