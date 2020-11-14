import { Button, Divider, Paper } from "@material-ui/core"
import MenuItem from "material-ui/MenuItem"
import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import { SelectField, TextField } from "redux-form-material-ui"
import { messages } from "../../../../lib"
import { CustomToggle } from "../../../shared/form"
import PaymentGateway from "../../paymentGateway"
import { availablePaymentGateways } from "../../paymentGateway/availablePaymentGateways"
import SelectShippingMethodsField from "./selectShipping"
import style from "./style.module.sass"

const validate = values => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const EditPaymentMethodForm = props => {
  const [gateway, setGateway] = useState(null)

  useEffect(() => {
    props.onLoad()
  }, [])

  useEffect(() => {
    setGateway(props.initialValues.gateway)
  }, [props.initialValues])

  const {
    handleSubmit,
    pristine,
    submitting,
    shippingMethods,
    methodId,
    settings,
  } = props
  const isAdd = methodId === null || methodId === undefined
  let paymentGateways = []
  paymentGateways.push(<MenuItem value="" key="none" primaryText="None" />)
  for (const gateway of availablePaymentGateways) {
    paymentGateways.push(
      <MenuItem
        value={gateway.key}
        key={gateway.key}
        primaryText={gateway.name}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper className="paper-box" elevation={4}>
        <div className={style.innerBox}>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="blue-title">{messages.paymentGateway}</div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <Field
                component={SelectField}
                autoWidth
                fullWidth
                name="gateway"
                floatingLabelFixed
                floatingLabelText={messages.paymentGateway}
                onChange={(event, currentValue, prevValue) => {
                  setGateway(currentValue)
                }}
              >
                {paymentGateways}
              </Field>
              <PaymentGateway gateway={gateway} />
            </div>
          </div>

          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-xs-12 col-sm-4">
              <div className="blue-title">{messages.description}</div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <Field
                component={TextField}
                fullWidth
                name="name"
                floatingLabelText={messages.settings_paymentMethodName}
              />
              <Field
                component={TextField}
                fullWidth
                name="description"
                multiLine
                floatingLabelText={messages.description}
              />
              <Field
                component={CustomToggle}
                name="enabled"
                label={messages.enabled}
                style={{ paddingTop: 16, paddingBottom: 20 }}
              />
            </div>
            <Divider />
          </div>
        </div>

        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-xs-12 col-sm-4">
            <div className="blue-title">{messages.settings_conditions}</div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <Field
              component={TextField}
              fullWidth
              name="conditions.countries"
              floatingLabelText={messages.settings_countries}
              hintText="US,UK,AU,SG"
            />
            <div className="row">
              <div className="col-xs-6">
                <Field
                  component={TextField}
                  name="conditions.subtotal_min"
                  type="number"
                  fullWidth
                  floatingLabelText={
                    messages.settings_minSubtotal +
                    ` (${settings.currency_symbol})`
                  }
                />
              </div>
              <div className="col-xs-6">
                <Field
                  component={TextField}
                  name="conditions.subtotal_max"
                  type="number"
                  fullWidth
                  floatingLabelText={
                    messages.settings_maxSubtotal +
                    ` (${settings.currency_symbol})`
                  }
                />
              </div>
            </div>
            <div className="gray-title" style={{ marginTop: "30px" }}>
              {messages.settings_onlyShippingMethods}
            </div>
            <Field
              name="conditions.shipping_method_ids"
              component={SelectShippingMethodsField}
              shippingMethods={shippingMethods}
            />
          </div>
        </div>
        <div className="buttons-box">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={style.button}
            disabled={pristine || submitting}
          >
            {isAdd ? messages.add : messages.save}
          </Button>
        </div>
      </Paper>
    </form>
  )
}

export default reduxForm({
  form: "EditPaymentMethodForm",
  validate,
  enableReinitialize: true,
})(EditPaymentMethodForm)
