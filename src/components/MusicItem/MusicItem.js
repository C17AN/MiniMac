import React from "react"
import "./MusicItem.scss"

function MusicItem({ title, image, artist, link }) {
  return (
    <div>
      <a href={link} target="_blank">
        <li className="MusicItem">
          <p className="Music-image">
            <img src={image} />
          </p>
          <div className="Music-title">{title}</div>
          <div className="Music-artist">{artist}</div>
        </li>
      </a>
    </div>
  )
}

export default MusicItem
