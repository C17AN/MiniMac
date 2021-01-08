import React from "react"
import "./GuestBook.scss"

const GuestBook = ({ title, message, labels }) => {
  return (
    <div className="guest">
      <h3 className="guest__name">
        {labels[1] && labels[1].name === "Secret"
          ? "비밀 메시지입니다."
          : title}
      </h3>
      <div className="guest__message">
        {labels[1] && labels[1].name === "Secret" ? "" : message}
      </div>
    </div>
  )
}

export default GuestBook
