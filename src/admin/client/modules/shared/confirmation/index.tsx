import { Button } from "@material-ui/core"
import Dialog from "material-ui/Dialog"
import React, { FC, useEffect, useState } from "react"

interface props {
  title: string
  description: string
  submitLabel
  cancelLabel
  modal?: boolean
  open: boolean
  onCancel: Function
  onSubmit: Function
}

const ConfirmationDialog: FC<props> = (props: props) => {
  const [open, setOpen] = useState(props.open)

  const {
    title,
    description,
    submitLabel,
    cancelLabel,
    modal = false,
    onCancel,
    onSubmit,
  } = props

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  const handleCancel = () => {
    setOpen(false)
    if (onCancel) {
      onCancel()
    }
  }

  const handleSubmit = () => {
    setOpen(false)
    if (onSubmit) {
      onSubmit()
    }
  }

  const actions = [
    <Button
      variant="contained"
      color="primary"
      onClick={handleCancel}
      style={{ marginRight: 10 }}
    >
      {cancelLabel}
    </Button>,
    <Button
      variant="contained"
      color="primary"
      focusRipple
      onClick={handleSubmit}
    >
      {submitLabel}
    </Button>,
  ]

  return (
    <Dialog
      title={title}
      actions={actions}
      modal={modal}
      open={open}
      onRequestClose={handleCancel}
    >
      <div style={{ wordWrap: "break-word" }}>{description}</div>
    </Dialog>
  )
}

export default ConfirmationDialog
