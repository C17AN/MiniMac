import React from "react"
import { navigate } from "gatsby"
import "./TopButton.scss"

function TopButton() {
  return (
    <div className="TopButton">
      <span className="button-red" onClick={() => navigate(-1)}></span>
      <span className="button-yellow"></span>
      <span className="button-green"></span>
    </div>
  )
}

export default TopButton
