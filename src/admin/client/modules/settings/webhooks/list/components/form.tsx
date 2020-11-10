import { Divider, Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import messages from "lib/text"
import { List, ListItem } from "material-ui/List"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

const WebhookItem = ({ webhook }) => {
  const events =
    webhook.events && webhook.events.length > 0
      ? webhook.events.join(", ")
      : "none"
  return (
    <>
      <Divider />
      <Link
        to={`/admin/settings/webhooks/${webhook.id}`}
        style={{ textDecoration: "none" }}
      >
        <ListItem
          rightIcon={<KeyboardArrowRight />}
          style={!webhook.enabled ? { color: "rgba(0, 0, 0, 0.3)" } : {}}
          primaryText={
            <div className="row">
              <div className="col-xs-6">{webhook.url}</div>
              <div className="col-xs-6" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
                {events}
              </div>
            </div>
          }
        />
      </Link>
    </>
  )
}

interface props {
  webhooks
  onLoad: Function
}

const WebhooksList: FC<props> = (props: props) => {
  const { webhooks, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  let listItems = webhooks.map((webhook, index) => (
    <WebhookItem key={index} webhook={webhook} />
  ))

  return (
    <>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.webhooksAbout}
      </div>
      <Paper className="paper-box" elevation={4}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>{listItems}</List>
        </div>
      </Paper>
    </>
  )
}

export default WebhooksList
