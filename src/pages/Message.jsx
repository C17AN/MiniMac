import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import GuestBook from "../components/GuestBook/GuestBook"
import Layout from "../components/layout"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import "../styles/pages/Message.scss"

const Message = ({ data, location }) => {
  const [guestList, setGuestList] = useState([])
  const [guestName, setGuestName] = useState("")
  const [message, setMessage] = useState("")
  const [secret, setSecret] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const date = new Date()
  let day = null
  let ment = null
  switch (date.getDay()) {
    case 0:
      day = "일"
      ment = "새로운 한 주도 파이팅이에요!"
      break
    case 1:
      day = "월"
      ment = "오늘도 행복한 하루 보내세요 :)"
      break
    case 2:
      day = "화"
      ment = "오늘도 들러주셔서 감사드려요! 😆"
      break
    case 3:
      day = "수"
      ment = "이틀만 더 버텨봐요! 파이팅!!"
      break
    case 4:
      day = "목"
      ment = "오늘은 왠지 좋은 예감이?!"
      break
    case 5:
      day = "금"
      ment = "한 주 고생 많으셨어요! ^__^"
      break
    case 6:
      day = "토"
      ment = "행복한 주말 보내시길 바래요 :)"
      break
    default:
      break
  }
  const tok1 = "6efc985955a7e"
  const tok2 = "7098f4fcf35f9"
  const tok3 = "44172b55f71deb"

  useEffect(() => {
    fetch("https://api.github.com/repos/c17an/MiniMac/issues")
      .then(res => res.json())
      .then(data => {
        setGuestList(
          data
            .filter(issue => {
              // 실제 이슈 리스트에서 정보 가공하는 단계
              // 유지보수 할때 참고 - labels[0]은 GuestBook 라벨, labels[1] 은 Secret(비밀글) 라벨임
              if (issue.labels[0] && issue.labels[0].name === "GuestBook") {
                return true
              } else {
                return false
              }
            })
            .map(guest => {
              return {
                title: guest.title,
                body: guest.body,
                labels: guest.labels.map(label => label),
              }
            })
        )
      })
  }, [])

  const handleSubmit = e => {
    const timestamp = new Date().getTime()
    e.preventDefault()
    fetch("https://api.github.com/repos/c17an/MiniMac/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${tok1}${tok2}${tok3}`,
      },
      body: JSON.stringify({
        title: `${guestName}`,
        body: `${message} - ${new Date(timestamp).toLocaleString()}`,
        labels: secret ? ["GuestBook", "Secret"] : ["GuestBook"],
      }),
    }).then(data => {
      setGuestList([
        {
          title: guestName,
          body: message + ` - ${new Date(timestamp).toLocaleString()}`,
          //labels: secret ? ['GuestBook', 'Secret'] : ['GuestBook'],
          labels: secret
            ? [{ name: "GuestBook" }, { name: "Secret" }]
            : [{ name: "GuestBook" }],
        },
        ...guestList,
      ])
    })
    setGuestName("")
    setMessage("")
  }
  const handleNameChange = e => {
    setGuestName(e.target.value)
  }
  const handleMessageChange = e => {
    setMessage(e.target.value)
  }
  const handleSecretCheck = e => {
    setSecret(!secret)
  }
  return (
    <Layout location={location}>
      <PostTemplate classAlias="Message">
        <div className="guestBook__container">
          <div className="guestBook__guestList">
            {guestList.map((guest, idx) => (
              <GuestBook
                key={idx}
                title={guest.title}
                message={guest.body}
                labels={guest.labels}
              ></GuestBook>
            ))}
          </div>
          <form className="guestBook__form" onSubmit={e => handleSubmit(e)}>
            <div className="guestBook__date">{`${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 ${date.getDate()}일 (${day})`}</div>
            <div className="bubble bubble-bottom-left">{ment}</div>
            <input
              className={"guestBook__name"}
              type="text"
              placeholder="이름을 입력하세요"
              name="name"
              onChange={e => handleNameChange(e)}
              autoComplete="off"
              value={guestName}
            ></input>
            <textarea
              className="guestBook__message"
              type="text"
              placeholder="메시지를 입력하세요"
              name="message"
              onChange={e => handleMessageChange(e)}
              value={message}
            ></textarea>
            <div className="guestBook__secret__container">
              <div>
                <input
                  type="checkbox"
                  name="guestBook__secret"
                  id="guestBook__secret"
                  className="guestBook__secret__checkbox"
                  onChange={handleSecretCheck}
                />
                <label
                  htmlFor="guestBook__secret"
                  className="guestBook__secret__label"
                >
                  비밀 메시지
                </label>
              </div>
              <button
                className="guestBook__button"
                disabled={!(guestName && message)}
              >
                전송
              </button>
            </div>
          </form>
        </div>
      </PostTemplate>
    </Layout>
  )
}

export default Message

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            lang
          }
        }
      }
    }
  }
`
