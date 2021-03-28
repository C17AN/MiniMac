import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import { graphql } from "gatsby"
import "../styles/pages/Contact.scss"

function Contact({ data, location }) {
  const posts = data.allMarkdownRemark.nodes
  const post = posts.filter(post => post.frontmatter.title === "about")

  return (
    <Layout location={location}>
      <PostTemplate classAlias="Contact">
        <div className="Contact-container">
          <Img
            fluid={data.WordCloud.childImageSharp.fluid}
            className="Contact-wordCloud"
          ></Img>
          <div dangerouslySetInnerHTML={{ __html: post[0].html }} />
        </div>
      </PostTemplate>
    </Layout>
  )
}

export default Contact

export const wordCloud = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      limit: 1000
    ) {
      nodes {
        id
        html
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
    WordCloud: file(relativePath: { eq: "wordCloud.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
