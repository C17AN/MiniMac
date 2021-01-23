import React from "react"
import { navigate, navigateTo } from "gatsby"
import "./TopButton.scss"

function TopButton() {
  return (
    <div className="TopButton">
      <span className="button-red" onClick={() => navigate(-1)}></span>
      <span className="button-yellow"></span>
      <span className="button-green" onClick={() => navigateTo("/")}></span>
    </div>
  )
}

export default TopButton
