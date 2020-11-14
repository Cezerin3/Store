import { Delete } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import React, { useState } from "react"
import { messages } from "../../../../../lib"
import DeleteConfirmation from "../../../../shared/deleteConfirmation"

const Buttons = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const deletePage = () => {
    setOpenDelete(false)
    props.onDelete(props.redirect.id)
  }

  const { redirect } = props
  const redirectName =
    redirect && redirect.from && redirect.from.length > 0
      ? redirect.from
      : "Draft"

  if (redirect) {
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
          itemName={redirectName}
          onCancel={() => setOpenDelete(false)}
          onDelete={deletePage}
        />
      </>
    )
  }
  return null
}

export default Buttons
