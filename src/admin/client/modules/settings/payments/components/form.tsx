import { Divider, Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import { List, ListItem } from "material-ui/List"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"

const MethodItem = ({ method }) => {
  return (
    <>
      <Divider />
      <Link
        to={`/admin/settings/payments/${method.id}`}
        style={{ textDecoration: "none" }}
      >
        <ListItem
          rightIcon={<KeyboardArrowRight />}
          style={!method.enabled ? { color: "rgba(0, 0, 0, 0.3)" } : {}}
          primaryText={
            <div className="row">
              <div className="col-xs-6">{method.name}</div>
              <div className="col-xs-6" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
                {method.description}
              </div>
            </div>
          }
        />
      </Link>
    </>
  )
}

interface props {
  paymentMethods
  onLoad: Function
}

const EmailSettings = (props: props) => {
  const { paymentMethods, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  let methods = paymentMethods.map((method, index) => (
    <MethodItem key={index} method={method} />
  ))

  return (
    <Paper className="paper-box" elevation={4}>
      <div style={{ width: "100%" }}>
        <List style={{ padding: 0 }}>{methods}</List>
      </div>
    </Paper>
  )
}

export default EmailSettings
