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
            <p className="login">Last login: Sat May 15 15:02:02</p>
            <p className="git-add">$ git add .</p>
            <p className="git-commit">
              $ git commit -m "feat: 안녕하세요, 찬민입니다!"
            </p>
            <p className="commit-message">
              [master 0f938c0] feat: 안녕하세요, 찬민입니다!
              <span className="cursor4"></span>
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
