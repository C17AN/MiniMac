import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import PostTemplate from "../components/PostTemplate/PostTemplate"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { EffectCoverflow } from "swiper"
import ProjectItem from "../components/ProjectItem/ProjectItem"
import { StaticQuery, graphql } from "gatsby"

import "swiper/swiper.scss"
import "swiper/components/effect-fade/effect-fade.scss"

SwiperCore.use([EffectCoverflow])

function Project({ data, location }) {
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    console.log(projectList)
    handleFetchProjects()
  }, [])

  const handleFetchProjects = async () => {
    fetch("data/data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(data => {
        console.log(data)
        setProjectList(data)
      })
  }

  return (
    <Layout location={location}>
      <PostTemplate>
        <Swiper effect="fade">
          {projectList.map((project, idx) => {
            return (
              <SwiperSlide>
                <ProjectItem data={project}></ProjectItem>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </PostTemplate>
    </Layout>
  )
}

export default Project
