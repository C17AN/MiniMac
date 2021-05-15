import React from "react"
import Layout from "../components/layout"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import "../styles/pages/Terminal.scss"

function Terminal({ data, location }) {
  return (
    <Layout location={location}>
      <PostTemplate classAlias="Terminal">
        <div className="fakeScreen">
          <div className="line-container">
            <p className="line1">
              $ git commit -m "feat: 안녕하세요, 찬민입니다!"
              <span className="cursor1">_</span>
            </p>
            <p className="line4">
              {">"}
              <span className="cursor4">_</span>
            </p>
          </div>
        </div>
      </PostTemplate>
    </Layout>
  )
}

export default Terminal
