import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import IconElement from "../components/IconElement/IconElement"
import "../styles/index.scss"
import SEO from "../components/seo"

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <div id="blog-title">
        <img src="https://img.icons8.com/fluent-systems-filled/24/ffffff/search.png" />
        <p
          className="title-text"
          style={{ display: "inline-block", marginLeft: "0.5rem" }}
        >
          찬민의 개발일기
        </p>
      </div>
      <div id="apps-dock">
        <IconElement fileName="Project" iconLabel="프로젝트"></IconElement>
        <IconElement fileName="Music" iconLabel="음악"></IconElement>
        <IconElement fileName="Note" iconLabel="포스트"></IconElement>
        <IconElement fileName="Activity" iconLabel="활동"></IconElement>
        <IconElement fileName="Message" iconLabel="메시지"></IconElement>
        <IconElement fileName="Terminal" iconLabel="터미널"></IconElement>
        <IconElement fileName="Contact" iconLabel="소개"></IconElement>
        <IconElement
          fileName="Setting"
          iconLabel="시스템 환경설정"
        ></IconElement>
      </div>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
        }
      }
    }
  }
`
