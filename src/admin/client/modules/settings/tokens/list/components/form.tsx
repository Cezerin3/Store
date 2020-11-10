import { Divider, Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import messages from "lib/text"
import { List, ListItem } from "material-ui/List"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

const TokenItem = ({ token }) => {
  return (
    <>
      <Divider />
      <Link
        to={`/admin/settings/tokens/${token.id}`}
        style={{ textDecoration: "none" }}
      >
        <ListItem
          rightIcon={<KeyboardArrowRight />}
          primaryText={
            <div className="row">
              <div className="col-xs-6">{token.name}</div>
              <div className="col-xs-6" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
                {token.email}
              </div>
            </div>
          }
        />
      </Link>
    </>
  )
}

interface props {
  tokens
  onLoad: Function
}

const TokensList: FC<props> = (props: props) => {
  const { tokens, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  let listItems = tokens.map((token, index) => (
    <TokenItem key={index} token={token} />
  ))

  return (
    <>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.settings_tokenHelp}
      </div>
      <Paper className="paper-box" elevation={4}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>{listItems}</List>
        </div>
      </Paper>
    </>
  )
}

export default TokensList
