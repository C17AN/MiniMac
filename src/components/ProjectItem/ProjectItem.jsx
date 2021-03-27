import React from "react"

const ProjectItem = ({ data }) => {
  const { name, tag } = data
  return <div>{name}</div>
}

export default ProjectItem
