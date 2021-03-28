import React, { useState } from "react"
import cn from "classnames"
import Layout from "../components/layout"
import Img from "gatsby-image"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import "../styles/pages/Setting.scss"
import { graphql } from "gatsby"

function Setting({ data, location }) {
  const [isMouseEntered, setIsMouseEntered] = useState(true)
  const [axis, setAxis] = useState({ x: 0, y: 0 })

  const onMouseMove = e => {
    setAxis({
      x: (window.innerWidth / 2 - e.pageX) / 15,
      y: (window.innerHeight / 2 - e.pageY) / 10,
    })
  }

  const onMouseEnter = () => {
    setIsMouseEntered(true)
  }

  const onMouseLeave = () => {
    setIsMouseEntered(false)
  }

  return (
    <Layout location={location}>
      <PostTemplate classAlias="Setting">
        <div
          className={cn("Setting-container", {
            containerAnimated: isMouseEntered,
          })}
          style={
            isMouseEntered
              ? { transform: `rotateY(${axis.x}deg) rotateX(${axis.y}deg)` }
              : { transition: `all 0.5s ease`, transform: `none` }
          }
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className={cn("Setting-icons", { iconsAnimated: isMouseEntered })}
          >
            <Img
              fluid={data.ReactIcon.childImageSharp.fluid}
              className="Setting-icon"
            ></Img>
            <Img
              fluid={data.SassIcon.childImageSharp.fluid}
              className="Setting-icon"
            ></Img>
            <Img
              fluid={data.GatsbyIcon.childImageSharp.fluid}
              className="Setting-icon"
            ></Img>
          </div>
          <div
            className={cn("Setting-description", {
              descriptionAnimated: isMouseEntered,
            })}
          >
            🔨 Built with React.js, Scss, Gatsby 🚀
          </div>{" "}
          <div
            className={cn("Setting-developer", {
              aboutAnimated: isMouseEntered,
            })}
          >
            Developed By <a href="https://github.com/C17AN">@C17AN</a>
          </div>
          <div
            className={cn("Setting-license", {
              lisenceAnimated: isMouseEntered,
            })}
          >
            MIT License, Free to modify and use.
          </div>
        </div>
      </PostTemplate>
    </Layout>
  )
}

export default Setting

export const Icon = graphql`
  query {
    ReactIcon: file(relativePath: { eq: "react-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    SassIcon: file(relativePath: { eq: "sass-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    GatsbyIcon: file(relativePath: { eq: "gatsby-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
