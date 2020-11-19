import React from "react"
import { messages } from "../lib"

const NotFound = () => (
  <div className="block404">
    <div className="title">404</div>
    <div className="description">{messages.pageNotFound}</div>
  </div>
)

export default NotFound
