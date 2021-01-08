import React from "react"
import Layout from "../components/layout"
import PostTemplate from "../components/PostTemplate/PostTemplate"

function Project({ data, location }) {
  return (
    <Layout location={location}>
      <PostTemplate></PostTemplate>
    </Layout>
  )
}

export default Project
