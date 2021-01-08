import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import "../styles/pages/Setting.scss"

function Setting({ data, location }) {
  return (
    <Layout location={location}>
      <PostTemplate classAlias="Setting">
        <div className="Setting-container">
          <div className="Setting-icons">
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
          <div className="Setting-description">
            🔨 Built with React.js, Scss, Gatsby 🚀
          </div>{" "}
          <div className="Setting-developer">
            Developed By <a href="https://github.com/C17AN">@C17AN</a>
          </div>
          <div className="Setting-license">
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
