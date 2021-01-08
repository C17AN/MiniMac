import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/pages/Note.scss"
import TopButton from "../components/TopButton/TopButton"
import Category from "../components/Category/Category"

const BlogIndex = ({ data, location }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes.filter(
    node => node.frontmatter.title !== "about"
  )

  const selectCategory = selected => {
    setSelectedCategory(selected)
  }

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          아직 글이 없네요. content/blog 폴더에 들어가 새로운 마크다운 포스트를
          작성해 보세요.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="Notes">
        <SEO title="All posts" />
        <div className="Note-left">
          <TopButton></TopButton>
          <ul className="Note-category">
            <span className="Note-category-text">카테고리</span>
            <span className="Note-category-text">|</span>
            <span
              onClick={() => selectCategory(null)}
              className="Note-category-text"
              style={{
                color: "#555555",
                cursor: "pointer",
              }}
            >
              모든 포스트
            </span>
            <Category posts={posts} OnClick={el => selectCategory(el)} />
          </ul>
        </div>
        <ol className="Note-right" style={{ listStyle: `none` }}>
          {posts
            .filter(post =>
              selectedCategory
                ? post.frontmatter.category === selectedCategory
                : true
            )
            .map(post => {
              const title = post.frontmatter.title || post.fields.slug
              return (
                <Link to={`${post.fields.slug}`} itemProp="url">
                  <li key={post.fields.slug}>
                    <article
                      className="post-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <header>
                        <h2>
                          <span itemProp="headline">{title}</span>
                        </h2>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: "0.8rem",
                              height: "0.8rem",
                              marginRight: "0.5rem",
                              borderRadius: "50%",
                              backgroundColor: post.frontmatter.color,
                            }}
                          ></span>
                          {post.frontmatter.category} / {post.frontmatter.date}
                        </div>
                      </header>
                      <section>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt || post.frontmatter.excerpt,
                          }}
                          itemProp="description"
                        />
                      </section>
                    </article>
                    <div className="Note-borderLine"></div>
                  </li>
                </Link>
              )
            })}
        </ol>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          excerpt
          title
          color
          description
          category
        }
      }
    }
  }
`
