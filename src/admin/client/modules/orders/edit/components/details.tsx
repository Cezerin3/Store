import { Paper } from "@material-ui/core"
import React, { FC, useEffect } from "react"
import OrderCustomer from "./customer"
import OrderItems from "./items"
import style from "./style.module.sass"
import OrderSummary from "./summary"
import OrderTotals from "./totals"

interface props {
  order
  settings
  onItemDelete
  onItemUpdate
  onShippingAddressUpdate
  onOrderSummaryUpdate
  onCheckout
  processingCheckout
  fetchData: Function
  clearData: Function
}

const OrderDetails: FC<props> = (props: props) => {
  const {
    order,
    settings,
    onItemDelete,
    onItemUpdate,
    onShippingAddressUpdate,
    onOrderSummaryUpdate,
    onCheckout,
    processingCheckout,
    fetchData,
    clearData,
  } = props

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    return () => clearData()
  }, [])

  if (!order) return null

  return (
    <div className="row row--no-gutter col-full-height">
      <div className="col-xs-12 col-sm-5 col-md-4 col--no-gutter scroll col-full-height">
        <OrderSummary
          order={order}
          settings={settings}
          onOrderSummaryUpdate={onOrderSummaryUpdate}
          onCheckout={onCheckout}
          processingCheckout={processingCheckout}
        />
        <OrderCustomer
          order={order}
          settings={settings}
          onShippingAddressUpdate={onShippingAddressUpdate}
        />
      </div>
      <div className="col-xs-12 col-sm-7 col-md-8 col--no-gutter scroll col-full-height">
        <Paper className="paper-box" elevation={4}>
          <OrderItems
            order={order}
            settings={settings}
            onItemDelete={onItemDelete}
            onItemUpdate={onItemUpdate}
          />
          <div className={style.innerBox}>
            <div className="row">
              <div className="col-xs-6" />
              <div className="col-xs-6">
                <OrderTotals order={order} settings={settings} />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default OrderDetails
