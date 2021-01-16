import React from "react"
import Layout from "../components/layout"
import MusicItem from "../components/MusicItem/MusicItem"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import "../styles/pages/Music.scss"

function Music({ data, location }) {
  return (
    <Layout location={location}>
      <PostTemplate classAlias="Music">
        <h1>찬보드 음원 순위 (2021. 01)</h1>
        <hr style={{ margin: 0 }}></hr>
        <div className="Music__container">
          <ul className="Music__list list-first">
            <MusicItem
              title="Papercut"
              image="https://cdnimg.melon.co.kr/cm/album/images/101/81/869/10181869_500.jpg?f277a8a43fee852cad1e8c9e2c6f38fd/melon/resize/282/quality/80/optimize"
              artist="우효"
              link="https://www.youtube.com/watch?v=2gutd8_WlpE"
            />
            <MusicItem
              title="야간비행"
              image="https://cdnimg.melon.co.kr/cm/album/images/102/62/378/10262378_500.jpg?0ad765df6c81ee924c170e501ae7de3d/melon/resize/282/quality/80/optimize"
              artist="백예린"
              link="https://www.youtube.com/watch?v=FIsCYzu_1Gc"
            />
            <MusicItem
              title="Perfect Timing"
              image="https://cdnimg.melon.co.kr/cm/album/images/102/30/263/10230263_500.jpg?11522ce7f7339da3bf310007c8c20b11/melon/resize/282/quality/80/optimize"
              artist="Tone Stith"
              link="https://www.youtube.com/watch?v=eFQpY8FwYew"
            />
            <MusicItem
              title="Endorphin"
              image="https://cdnimg.melon.co.kr/cm/album/images/101/84/916/10184916_500.jpg?76880235d13e0fddd4fcb1be78330e24/melon/resize/282/quality/80/optimize"
              artist="Crush"
              link="https://www.youtube.com/watch?v=I_yzIp20ugM"
            />
            <MusicItem
              title="특급 보이프렌드"
              image="https://cdnimg.melon.co.kr/cm/album/images/100/00/921/10000921_500.jpg?1917da2bd3a7ac61eea168e79ff61d01/melon/resize/282/quality/80/optimize"
              artist="크리스탈 티"
              link="https://www.youtube.com/watch?v=rj6f9ocGn1E"
            />
          </ul>
          <ul className="Music__list list-second">
            <MusicItem
              title="실패하지 않는 사랑이 있나요"
              image="https://cdnimg.melon.co.kr/cm2/album/images/104/96/194/10496194_20200925102245_500.jpg?8416d019122094d14bae4dc2a17b1d5b/melon/resize/282/quality/80/optimize"
              artist="김뜻돌"
              link="https://www.youtube.com/watch?v=_MxuT9dE6Y0&t=30m14s"
            />
            <MusicItem
              title="What's your"
              image="https://cdnimg.melon.co.kr/cm/album/images/102/52/289/10252289_500.jpg?8baa7862ac8548de09654e0ae15cb0c3/melon/resize/282/quality/80/optimize"
              artist="Cosmic Boy"
              link="https://www.youtube.com/watch?v=tEuJeHZZicg"
            ></MusicItem>
            <MusicItem
              title="미안 (Feat. OLNL)"
              image="https://cdnimg.melon.co.kr/cm/album/images/102/36/963/10236963_500.jpg?195f39b4e00bda7c12a9d955643af1c0/melon/resize/282/quality/80/optimize"
              artist="기리보이"
              link="https://www.youtube.com/watch?v=z2cA0UKkoe"
            />
            <MusicItem
              title="새벽의 연습실 (Feat. 지언)"
              image="https://cdnimg.melon.co.kr/cm/album/images/101/61/004/10161004_500.jpg?e901ce15397a35388ab2a5ec49605400/melon/resize/282/quality/80/optimize"
              artist="윤석철트리오"
              link="https://www.youtube.com/watch?v=stqMk_H7o7I0&t=46m47s"
            />
            <MusicItem
              title="빨래"
              image="https://cdnimg.melon.co.kr/cm/album/images/010/30/216/1030216_500.jpg/melon/resize/282/quality/80/optimize"
              artist="이적"
              link="https://www.youtube.com/watch?v=8BzmSqVYsRk"
            />
          </ul>
        </div>
      </PostTemplate>
    </Layout>
  )
}

export default Music
