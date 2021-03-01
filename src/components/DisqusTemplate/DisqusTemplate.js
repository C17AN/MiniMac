import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import { Disqus } from "gatsby-plugin-disqus"
import { DiscussionEmbed } from "disqus-react"

const DisqusTemplate = ({ pageContext, location }) => {
  const DisqusConfig = useStaticQuery(graphql`
    query DisqusQuery {
      markdownRemark {
        fields {
          slug
        }
      }
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)
  const siteUrl = DisqusConfig.site.siteMetadata.siteUrl + location.pathname
  let disqusConfig = {
    // url: siteUrl,
    // identifier: siteUrl,
    // title: DisqusConfig.site.siteMetadata.title,
    shortname: "c17an",
    config: {
      identifier: siteUrl,
      title: DisqusConfig.site.siteMetadata.title,
    },
  }

  return (
    <>
      {/* <Disqus config={disqusConfig} /> */}

      <DiscussionEmbed {...disqusConfig} />
    </>
  )
}

export default DisqusTemplate
