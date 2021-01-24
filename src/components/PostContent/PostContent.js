import React from "react"
import "./PostContent.scss"
import styled from "styled-components"
const PostContent = ({ children, innerHeight, innerWidth }) => {
  return <div className="post-content">{children}</div>
}

export default PostContent
