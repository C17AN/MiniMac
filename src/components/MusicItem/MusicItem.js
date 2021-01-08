import React from "react"
import "./MusicItem.scss"

function MusicItem({ title }) {
  return <li className="MusicItem">{title}</li>
}

export default MusicItem
