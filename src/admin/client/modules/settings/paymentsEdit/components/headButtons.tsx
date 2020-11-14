import { Delete } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import React, { useState } from "react"
import { messages } from "../../../../lib"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

const Buttons = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const deleteGroup = () => {
    setOpenDelete(false)
    props.onDelete(props.paymentMethod.id)
  }

  const { paymentMethod, onDelete } = props
  const methodName =
    paymentMethod && paymentMethod.name && paymentMethod.name.length > 0
      ? paymentMethod.name
      : "Draft"

  return (
    <span>
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
        isSingle={true}
        itemsCount={1}
        itemName={methodName}
        onCancel={() => setOpenDelete(false)}
        onDelete={deleteGroup}
      />
    </span>
  )
}

export default Buttons
