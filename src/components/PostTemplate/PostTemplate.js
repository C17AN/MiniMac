import React from "react"
import { Link, graphql } from "gatsby"

import "../../styles/pages/Note.scss"
import "./PostTemplate.scss"
import TopButton from "../../components/TopButton/TopButton"

const PostTemplate = ({ children, classAlias }) => {
  return (
    <div className={`post-container ${classAlias}`}>
      <div className="post-top">
        <TopButton />
      </div>
      <div className="post-content">{children}</div>
    </div>
  )
}

export default PostTemplate
