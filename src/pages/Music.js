import React from "react"
import Layout from "../components/layout"
import MusicItem from "../components/MusicItem/MusicItem"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import "../styles/pages/Music.scss"

function Music({ data, location }) {
  return (
    <Layout location={location}>
      <PostTemplate classAlias="Music">
        <h1>올해의 찬민 차트 BEST 10</h1>
        <hr></hr>
        <div className="Music__container">
          <ul className="Music__list list-first">
            <MusicItem title="나에게로 떠나는 여행" />
            <MusicItem title="범 내려온다" />
            <MusicItem title="나에게로 떠나는 여행" />
            <MusicItem title="나에게로 떠나는 여행" />
            <MusicItem title="나에게로 떠나는 여행" />
          </ul>
          <ul className="Music__list list-second">
            <MusicItem title="삐뽀삐뽀" />
            <MusicItem title="나에게로 떠나는 여행" />
            <MusicItem title="나에게로 떠나는 여행" />
            <MusicItem title="나에게로 떠나는 여행" />
            <MusicItem title="나에게로 떠나는 여행" />
          </ul>
        </div>
      </PostTemplate>
    </Layout>
  )
}

export default Music
