import { Divider, Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import { List, ListItem } from "material-ui/List"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

interface ItemProps {
  method: { id: string; name: string; enabled: boolean; description: string }
}

const MethodItem: FC<ItemProps> = ({ method }: ItemProps) => (
  <>
    <Divider />
    <Link
      to={`/admin/settings/shipping/${method.id}`}
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

interface props {
  shippingMethods
  onLoad: Function
}

const EmailSettings: FC<props> = (props: props) => {
  const { shippingMethods, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  let methods = shippingMethods.map((method, index) => (
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
