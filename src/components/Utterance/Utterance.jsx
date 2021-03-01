import React, { createRef, useLayoutEffect } from "react"

const src = "https://utteranc.es/client.js"

const Utterance = React.memo(({ repo }) => {
  const containerRef = createRef()

  useLayoutEffect(() => {
    const utterances = document.createElement("script")

    const attributes = {
      src,
      repo,
      "issue-term": "pathname",
      label: "🌟💬 Comment 🌃",
      theme: "github-light",
      crossOrigin: "anonymous",
      async: "true",
    }

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })

    containerRef.current.appendChild(utterances)
  }, [repo])

  return <div ref={containerRef} />
})

Utterance.displayName = "Utterances"

export default Utterance
