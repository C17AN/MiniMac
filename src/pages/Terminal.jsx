import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import "../styles/pages/Terminal.scss"

function Terminal({ data, location }) {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    setDate(new Date())
  }, [])
  return (
    <Layout location={location}>
      <PostTemplate classAlias="Terminal">
        <div className="fakeScreen">
          <div className="line-container">
            <p className="login">
              Last login: {date.toDateString()}{" "}
              {date.getHours() > 10
                ? date.getHours()
                : "0" + String(date.getHours())}
              :
              {date.getMinutes() > 10
                ? date.getMinutes()
                : "0" + String(date.getMinutes())}
              :
              {date.getSeconds() > 10
                ? date.getSeconds()
                : "0" + String(date.getSeconds())}
            </p>
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
