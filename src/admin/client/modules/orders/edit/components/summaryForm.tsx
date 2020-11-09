import FlatButton from "material-ui/FlatButton"
import MenuItem from "material-ui/MenuItem"
import React, { FC, useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import { SelectField, TextField } from "redux-form-material-ui"
import { api, messages } from "../../../../lib"
import style from "./style.module.sass"

const validate = (values: []) => {
  const errors = {}
  const requiredFields = []

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

interface props {
  handleSubmit: Function
  pristine: boolean
  submitting: boolean
  onCancel: Function
  initialValues: { id: string }
}

const SummaryForm: FC<props> = (props: props) => {
  const [shippingMethods, setShippingMethods] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [orderStatuses, setOrderStatuses] = useState([])

  const { handleSubmit, pristine, submitting, onCancel, initialValues } = props

  useEffect(() => {
    fetchData(initialValues.id)
  }, [])

  const fetchData = async orderId => {
    const filter = {
      order_id: orderId,
    }

    try {
      const orderList = await api.orderStatuses.list()
      setOrderStatuses(orderList.json)

      const shippingList = await api.shippingMethods.list(filter)
      setShippingMethods(shippingList.json)

      const paymentList = await api.paymentMethods.list(filter)
      setPaymentMethods(paymentList.json)
    } catch (error) {
      console.error(error)
    }
  }

  const statusItems = orderStatuses.map((item, index) => (
    <MenuItem key={index} value={item.id} primaryText={item.name} />
  ))
  const shippingItems = shippingMethods.map((item, index) => (
    <MenuItem key={index} value={item.id} primaryText={item.name} />
  ))
  const paymentItems = paymentMethods.map((item, index) => (
    <MenuItem key={index} value={item.id} primaryText={item.name} />
  ))

  statusItems.push(
    <MenuItem key="none" value={null} primaryText={messages.noOrderStatus} />
  )

  return (
    <form
      onSubmit={() => handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <>
        <Field
          component={SelectField}
          fullWidth
          name="status_id"
          floatingLabelText={messages.orderStatus}
        >
          {statusItems}
        </Field>
        <Field
          component={TextField}
          fullWidth
          name="tracking_number"
          floatingLabelText={messages.trackingNumber}
        />
        <Field
          component={SelectField}
          fullWidth
          name="shipping_method_id"
          floatingLabelText={messages.shippingMethod}
        >
          {shippingItems}
        </Field>

        <Field
          component={SelectField}
          fullWidth
          name="payment_method_id"
          floatingLabelText={messages.paymentsMethod}
        >
          {paymentItems}
        </Field>

        <>
          <Field
            component={TextField}
            fullWidth
            name="comments"
            floatingLabelText={messages.customerComment}
          />
          <Field
            component={TextField}
            fullWidth
            name="note"
            floatingLabelText={messages.note}
          />
          <Field
            component={TextField}
            fullWidth
            name="email"
            floatingLabelText={messages.email}
          />
          <Field
            component={TextField}
            fullWidth
            name="mobile"
            floatingLabelText={messages.mobile}
          />
        </>
      </>
      <div className={style.shippingButtons}>
        <FlatButton label={messages.cancel} onClick={() => onCancel} />
        <FlatButton
          label={messages.save}
          primary
          type="submit"
          style={{ marginLeft: 12 }}
          disabled={pristine || submitting}
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form: "SummaryForm",
  validate,
  enableReinitialize: true,
})(SummaryForm)
