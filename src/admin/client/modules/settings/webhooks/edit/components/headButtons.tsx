import { Delete } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import React, { FC, useState } from "react"
import { messages } from "../../../../../lib"
import DeleteConfirmation from "../../../../shared/deleteConfirmation"

interface props {
  webhook
  onDelete: Function
}

const Buttons: FC<props> = (props: props) => {
  const [openDelete, setOpenDelete] = useState(false)

  const { webhook, onDelete } = props

  const deletePage = () => {
    setOpenDelete(false)
    onDelete(webhook.id)
  }

  const webhookName =
    webhook && webhook.url && webhook.url.length > 0 ? webhook.url : "Draft"

  if (webhook) {
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
          itemName={webhookName}
          onCancel={() => setOpenDelete(false)}
          onDelete={deletePage}
        />
      </>
    )
  } else {
    return null
  }
}

export default Buttons
