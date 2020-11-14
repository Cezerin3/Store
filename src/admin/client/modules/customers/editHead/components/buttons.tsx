import { Delete } from "@material-ui/icons"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import React, { useState } from "react"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

const Buttons = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const deleteOrder = () => {
    setOpenDelete(false)
    props.onDelete()
  }

  const { customer } = props
  const customerName =
    customer && customer.full_name && customer.full_name.length > 0
      ? customer.full_name
      : "Draft"

  return (
    <>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.actions_delete}
        onClick={() => setOpenDelete(true)}
      >
        <Delete htmlColor="#fff" />
      </IconButton>
      <DeleteConfirmation
        open={openDelete}
        isSingle
        itemsCount={1}
        itemName={customerName}
        onCancel={() => setOpenDelete(false)}
        onDelete={props.onDelete}
      />
    </>
  )
}

export default Buttons
