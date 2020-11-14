import { Button } from "@material-ui/core"
import Dialog from "material-ui/Dialog"
import React, { useEffect, useState } from "react"
import { reduxForm } from "redux-form"
import { messages } from "../../../../lib"
import { availablePaymentGateways } from "../availablePaymentGateways"
import GatewaySettings from "./gatewaySettings"
import style from "./style.module.sass"

const EditPaymentGatewayForm = props => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    props.onLoad()
  }, [])

  useEffect(() => {
    props.onLoad(props.gateway)
  }, [props.gateway])

  const { handleSubmit, pristine, submitting } = props
  const gatewayDetails = availablePaymentGateways.find(
    item => item.key === props.gateway
  )

  if (props.gateway && props.gateway.length > 0) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          style={{ margin: "15px 0 30px 0" }}
        >
          {messages.drawer_settings}
        </Button>

        <Dialog
          title={gatewayDetails.name}
          modal={false}
          open={open}
          autoScrollBodyContent
          contentStyle={{ width: 600 }}
          onRequestClose={() => setOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "initial", width: "100%" }}
          >
            <GatewaySettings gateway={props.gateway} />

            <div className={style.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(false)}
              >
                {messages.cancel}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => setOpen(false)}
                style={{ marginLeft: 12 }}
                disabled={pristine || submitting}
              >
                {messages.save}
              </Button>
            </div>
          </form>
        </Dialog>
      </>
    )
  } else {
    return null
  }
}

export default reduxForm({
  form: "EditPaymentGatewayForm",
  enableReinitialize: true,
})(EditPaymentGatewayForm)
