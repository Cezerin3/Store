import { Button, Paper } from "@material-ui/core"
import React, { FC, useState } from "react"
import { api, messages } from "../../../../lib"
import style from "./style.module.sass"

interface props {
  action: { id: String; name: string; description: string }
  serviceId: string
  fetchServiceLogs: Function
}

const ActionComponent: FC<props> = (props: props) => {
  const [loading, setLoading] = useState(false)
  const { action, serviceId, fetchServiceLogs } = props

  const handleActionCall = async () => {
    setLoading(true)

    try {
      await api.webstore.services.actions.call(serviceId, action.id)
      setLoading(false)
      return fetchServiceLogs()
    } catch (error) {
      console.error(error)
      alert(error)
      setLoading(false)
      fetchServiceLogs()
    }
  }

  return (
    <div className={style.action}>
      <div className="row middle-xs">
        <div className="col-xs-7" style={{ fontSize: "14px" }}>
          {action.description}
        </div>
        <div className="col-xs-5" style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleActionCall}
          >
            {action.name}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface ServiceProps {
  actions: { id: String; name: string; description: string }[]
  serviceId: string
  fetchServiceLogs: Function
}

const ServiceActions: FC<ServiceProps> = (props: ServiceProps) => {
  const { actions, serviceId, fetchServiceLogs } = props
  const buttons = actions.map((action, index) => (
    <ActionComponent
      key={index}
      action={action}
      serviceId={serviceId}
      fetchServiceLogs={fetchServiceLogs}
    />
  ))

  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div className="gray-title" style={{ margin: "15px 0 15px 20px" }}>
        {messages.serviceActions}
      </div>
      <Paper className="paper-box" elevation={4}>
        {buttons}
      </Paper>
    </div>
  )
}

export default ServiceActions
