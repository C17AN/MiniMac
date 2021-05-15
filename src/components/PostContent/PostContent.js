import React from "react"
import "./PostContent.scss"
import styled from "styled-components"
const PostContent = ({ children, innerHeight, innerWidth, classAlias }) => {
  return <div className={`post-content ${classAlias}-content`}>{children}</div>
}

export default PostContent
