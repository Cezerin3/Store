import { Divider } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import React, { useState } from "react"
import ConfirmationDialog from "../../../shared/confirmation"
import DeleteConfirmation from "../../../shared/deleteConfirmation"
import ProductSearchDialog from "../../../shared/productSearch"

const Buttons = props => {
  const [showClose, setShowClose] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)

  const { settings, order, onDelete } = props

  const setClosed = () => {
    setShowClose(false)
    props.setClosed(order.id)
  }

  const setCancelled = () => {
    setShowCancel(false)
    props.setCancelled(order.id)
  }

  const deleteOrder = () => {
    setOpenDelete(false)
    props.onDelete()
  }

  const holdOrder = () => {
    props.holdOrder(order.id)
  }

  const resumeOrder = () => {
    props.resumeOrder(order.id)
  }

  const addItem = productId => {
    setShowAddItem(false)
    props.addItem(order.id, productId)
  }

  if (order) {
    const orderName = `${messages.order} #${order.number}`

    let menuItems = []
    if (order.closed) {
      //
    } else if (order.cancelled) {
      //
    } else {
      menuItems.push(
        <MenuItem
          key="addItem"
          primaryText={messages.addOrderItem}
          onClick={() => setShowAddItem(true)}
        />
      )
      menuItems.push(<Divider key="dev1" />)
      if (order.hold) {
        menuItems.push(
          <MenuItem
            key="resume"
            primaryText={messages.resumeOrder}
            onClick={resumeOrder}
          />
        )
      } else {
        menuItems.push(
          <MenuItem
            key="hold"
            primaryText={messages.holdOrder}
            onClick={holdOrder}
          />
        )
      }
      menuItems.push(
        <MenuItem
          key="close"
          primaryText={messages.closeOrder}
          onClick={() => setShowClose(true)}
        />
      )
      menuItems.push(
        <MenuItem
          key="cancel"
          primaryText={messages.cancelOrder}
          onClick={() => setShowCancel(true)}
        />
      )
    }

    return (
      <span>
        <ProductSearchDialog
          open={showAddItem}
          title={messages.addOrderItem}
          settings={settings}
          onSubmit={addItem}
          onCancel={() => setShowAddItem(false)}
          submitLabel={messages.add}
          cancelLabel={messages.cancel}
        />

        <ConfirmationDialog
          open={showClose}
          title={orderName}
          description={messages.closeOrderConfirmation}
          onSubmit={setClosed}
          onCancel={() => setShowClose(false)}
          submitLabel={messages.closeOrder}
          cancelLabel={messages.cancel}
        />

        <ConfirmationDialog
          open={showCancel}
          title={orderName}
          description={messages.cancelOrderConfirmation}
          onSubmit={setCancelled}
          onCancel={() => setShowCancel(false)}
          submitLabel={messages.cancelOrder}
          cancelLabel={messages.cancel}
        />

        <DeleteConfirmation
          open={openDelete}
          isSingle
          itemsCount={1}
          itemName={orderName}
          onCancel={() => setOpenDelete(false)}
          onDelete={deleteOrder}
        />

        <IconMenu
          iconButtonElement={
            <IconButton touch>
              <MoreVert htmlColor="#fff" />
            </IconButton>
          }
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          {menuItems}
          <MenuItem
            primaryText={messages.deleteOrder}
            onClick={() => setOpenDelete(true)}
          />
        </IconMenu>
      </span>
    )
  } else {
    return <span />
  }
}

export default Buttons
