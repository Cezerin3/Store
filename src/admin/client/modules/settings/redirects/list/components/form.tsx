import { Divider, Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import messages from "lib/text"
import { List, ListItem } from "material-ui/List"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"

const RedirectItem = ({ redirect }) => (
  <>
    <Divider />
    <Link
      to={`/admin/settings/redirects/${redirect.id}`}
      style={{ textDecoration: "none" }}
    >
      <ListItem
        rightIcon={<KeyboardArrowRight />}
        primaryText={
          <div className="row">
            <div className="col-xs-4">{redirect.from}</div>
            <div className="col-xs-4">{redirect.to}</div>
            <div className="col-xs-4" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
              301
            </div>
          </div>
        }
      />
    </Link>
  </>
)

const RedirectsList = props => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { redirects } = props
  const listItems = redirects.map((redirect, index) => (
    <RedirectItem key={index} redirect={redirect} />
  ))

  return (
    <>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.redirectsAbout}
      </div>
      <Paper className="paper-box" elevation={4}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>{listItems}</List>
        </div>
      </Paper>
    </>
  )
}

export default RedirectsList
