import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "./IconElement.scss"

const IconElement = ({ fileName, iconLabel }) => {
  const Icon = useStaticQuery(graphql`
    query {
      MapIcon: file(relativePath: { eq: "Map-min.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      MusicIcon: file(relativePath: { eq: "Music-min.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ContactIcon: file(relativePath: { eq: "Contact-min.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      NoteIcon: file(relativePath: { eq: "Note-min.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ProjectIcon: file(relativePath: { eq: "Project-min.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      SettingIcon: file(relativePath: { eq: "Setting-min.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      TerminalIcon: file(relativePath: { eq: "Terminal-min.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      MessageIcon: file(relativePath: { eq: "Message-min.png" }) {
        childImageSharp {
          fluid(maxWidth: 108) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Link className="app-icon" to={`/${fileName}`}>
      <Img
        fluid={Icon[`${fileName}Icon`].childImageSharp.fluid}
        alt="Icon"
        style={{ width: "100%" }}
      ></Img>
      <label>{iconLabel}</label>
    </Link>
  )
}

export default IconElement
