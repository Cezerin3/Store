import { Button, Divider, Paper } from "@material-ui/core"
import Dialog from "material-ui/Dialog"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { helper, messages } from "../../../../lib"
import ShippingAddressForm from "./shippingAddressForm"
import style from "./style.module.sass"

const getShippingFieldLabel = ({ label, key }) => {
  return label && label.length > 0 ? label : helper.getOrderFieldLabelByKey(key)
}

const ShippingFields = ({ order, shippingMethod }) => {
  let rows = null
  if (
    shippingMethod &&
    shippingMethod.fields &&
    shippingMethod.fields.length > 0
  ) {
    rows = shippingMethod.fields.map((field, index) => {
      const fieldLabel = getShippingFieldLabel(field)
      const fieldValue = order.shipping_address[field.key]

      return (
        <ShippingFieldDiv key={index} label={fieldLabel} value={fieldValue} />
      )
    })
  }

  return <>{rows}</>
}

const ShippingFieldDiv = ({ label, value }) => (
  <>
    <label>{label}: </label>
    {value}
  </>
)

const ShippingAddress = ({ order, settings }) => {
  const address = order.shipping_address
  const shippingMethod = order.shipping_method_details

  return (
    <div className={style.address} style={{ marginBottom: 20 }}>
      <ShippingFields order={order} shippingMethod={shippingMethod} />
      <div className={style.address}>
        <p>{address.full_name}</p>
        <p>{address.company}</p>
        <p>{address.address1}</p>
        <p>{address.address2}</p>
        <p>
          {address.city},{" "}
          {address.state && address.state.length > 0
            ? address.state + ", "
            : ""}
          {address.postal_code}
        </p>
        <p>{address.country}</p>
        <p>{address.phone}</p>
      </div>
    </div>
  )
}

const BillingAddress = ({ address, settings }) => {
  const billinsAddressIsEmpty =
    address.address1 === "" &&
    address.address2 === "" &&
    address.city === "" &&
    address.company === "" &&
    address.country === "" &&
    address.full_name === "" &&
    address.phone === "" &&
    address.state === "" &&
    address.tax_number === "" &&
    address.postal_code === ""

  if (billinsAddressIsEmpty && settings.hide_billing_address) {
    return null
  } else if (billinsAddressIsEmpty && !settings.hide_billing_address) {
    return (
      <>
        <Divider
          style={{
            marginTop: 30,
            marginBottom: 30,
            marginLeft: -30,
            marginRight: -30,
          }}
        />
        <div style={{ paddingBottom: 16, paddingTop: 0 }}>
          {messages.billingAddress}
        </div>
        <div className={style.address}>
          <label>{messages.sameAsShipping}</label>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Divider
          style={{
            marginTop: 30,
            marginBottom: 30,
            marginLeft: -30,
            marginRight: -30,
          }}
        />
        <div style={{ paddingBottom: 16, paddingTop: 0 }}>
          {messages.billingAddress}
        </div>
        <div className={style.address}>
          <p>{address.full_name}</p>
          <p>{address.company}</p>
          <p>{address.address1}</p>
          <p>{address.address2}</p>
          <p>
            {address.city},{" "}
            {address.state && address.state.length > 0
              ? address.state + ", "
              : ""}
            {address.postal_code}
          </p>
          <p>{address.country}</p>
          <p>{address.phone}</p>
        </div>
      </>
    )
  }
}

const OrderCustomer = props => {
  const [openShippingEdit, setOpenShippingEdit] = useState(false)

  const { order, settings } = props

  const hideShippingEdit = () => {
    setOpenShippingEdit(false)
  }

  const saveShippingEdit = address => {
    props.onShippingAddressUpdate(address)
    hideShippingEdit()
  }

  const allowEdit = order.closed === false && order.cancelled === false
  let mapAddress = `${order.shipping_address.address1} ${order.shipping_address.city} ${order.shipping_address.state} ${order.shipping_address.postal_code}`
  mapAddress = mapAddress.replace(/ /g, "+")
  const mapUrl = `https://www.google.com/maps/place/${mapAddress}`

  return (
    <>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.customer}
      </div>
      <Paper className="paper-box" elevation={4}>
        <div className={style.innerBox}>
          <div className={style.address}>
            <Link
              to={`/admin/customer/${order.customer_id}`}
              className={style.link}
            >
              {order.customer && order.customer.full_name}
            </Link>
            <a href={"MailTo:" + order.email} className={style.link}>
              {order.email}
            </a>
            <p>{order.mobile}</p>
          </div>

          <Divider
            style={{
              marginTop: 30,
              marginBottom: 30,
              marginLeft: -30,
              marginRight: -30,
            }}
          />

          <div style={{ paddingBottom: 16, paddingTop: 0 }}>
            {messages.shippingAddress}
          </div>
          <ShippingAddress order={order} settings={settings} />

          {allowEdit && (
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 15 }}
              onClick={() => setOpenShippingEdit(true)}
            >
              {messages.edit}
            </Button>
          )}
          <a href={mapUrl} target="_blank">
            <Button variant="contained" color="primary">
              View map
            </Button>
          </a>

          <BillingAddress address={order.billing_address} settings={settings} />

          <Dialog
            title={messages.shippingAddress}
            modal={false}
            open={openShippingEdit}
            onRequestClose={hideShippingEdit}
            autoScrollBodyContent
            contentStyle={{ width: 600 }}
          >
            <ShippingAddressForm
              initialValues={order.shipping_address}
              onCancel={hideShippingEdit}
              onSubmit={saveShippingEdit}
              shippingMethod={order.shipping_method_details}
            />
          </Dialog>
        </div>
      </Paper>
    </>
  )
}

export default OrderCustomer
