import { Divider, Paper } from "@material-ui/core"
import { KeyboardArrowRight, LockOutlined } from "@material-ui/icons"
import { List, ListItem } from "material-ui/List"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

interface PageItemProps {
  page: {
    tags: []
    id: string
    is_system: boolean
    enabled: boolean
    meta_title: string
  }
}

const PageItem = ({ page }: PageItemProps) => {
  const tags = page.tags && page.tags.length > 0 ? page.tags.join(", ") : ""

  return (
    <>
      <Divider />
      <Link to={`/admin/pages/${page.id}`} style={{ textDecoration: "none" }}>
        <ListItem
          rightIcon={<KeyboardArrowRight />}
          leftIcon={page.is_system ? <LockOutlined /> : null}
          style={!page.enabled ? { color: "rgba(0, 0, 0, 0.3)" } : {}}
          primaryText={
            <div className="row">
              <div className="col-xs-8">{page.meta_title}</div>
              <div className="col-xs-4" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
                {tags}
              </div>
            </div>
          }
        />
      </Link>
    </>
  )
}

interface props {
  pages
  onLoad
}

const PagesList: FC<props> = (props: props) => {
  const { pages, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  let listItems = pages.map((page, index) => (
    <PageItem key={index} page={page} />
  ))

  return (
    <Paper className="paper-box" elevation={4}>
      <div style={{ width: "100%" }}>
        <List style={{ padding: 0 }}>{listItems}</List>
      </div>
    </Paper>
  )
}

export default PagesList
