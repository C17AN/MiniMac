import React from "react"
import "./Category.scss"

const Category = ({ posts, OnClick }) => {
  let postCount = {}
  const postList = posts
  let categorySet = new Set()
  let colorSet = new Set()
  postList.forEach(post => {
    colorSet.add(post.frontmatter.color)
    categorySet.add(post.frontmatter.category)
    // 카테고리 옆에 게시글 수 구해주는 코드
    if (postCount[post.frontmatter.category] !== undefined) {
      postCount[post.frontmatter.category] += 1
    } else {
      postCount[post.frontmatter.category] = 1
    }
  })
  return (
    <div className="Note-category-container">
      {" "}
      {Array.from(categorySet).map((post, idx) => (
        <div
          key={idx}
          className="Note-category-item"
          onClick={() => OnClick(Array.from(categorySet)[idx])}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                backgroundColor: Array.from(colorSet)[idx],
                borderRadius: "50%",
                width: "0.8rem",
                height: "0.8rem",
              }}
            ></span>
            <span className="Note-category-label">
              {Array.from(categorySet)[idx]}
            </span>
          </span>
          <span className="Note-post-count">
            {postCount[Array.from(categorySet)[idx]]}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Category
