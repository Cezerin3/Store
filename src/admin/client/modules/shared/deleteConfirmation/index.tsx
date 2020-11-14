import { Button } from "@material-ui/core"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import React, { useEffect, useState } from "react"

const ConfirmationDialog = props => {
  const [open, setOpen] = useState(props.open)

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  const close = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    close()
    if (props.onCancel) {
      props.onCancel()
    }
  }

  const handleDelete = () => {
    close()
    if (props.onDelete) {
      props.onDelete()
    }
  }

  const { isSingle = true, itemsCount = 0, itemName = "" } = props

  const title = isSingle
    ? messages.singleDeleteTitle.replace("{name}", itemName)
    : messages.multipleDeleteTitle.replace("{count}", itemsCount)

  const description = isSingle
    ? messages.singleDeleteDescription
    : messages.multipleDeleteDescription.replace("{count}", itemsCount)

  const actions = [
    <Button
      variant="contained"
      color="primary"
      onClick={handleCancel}
      style={{ marginRight: 10 }}
    >
      {messages.cancel}
    </Button>,
    <Button
      variant="contained"
      color="primary"
      focusRipple
      onClick={handleDelete}
    >
      {messages.actions_delete}
    </Button>,
  ]

  return (
    <Dialog
      title={title}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={handleCancel}
      contentStyle={{ maxWidth: 540 }}
      titleStyle={{ fontSize: "18px", lineHeight: "28px" }}
    >
      <div style={{ wordWrap: "break-word" }}>{description}</div>
    </Dialog>
  )
}

export default ConfirmationDialog
