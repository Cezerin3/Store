import { Add, Delete } from "@material-ui/icons"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import React, { useState } from "react"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

const Buttons = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const deleteGroup = () => {
    setOpenDelete(false)
    props.onDelete(props.selected.id)
  }

  const { selected, onDelete, onCreate } = props
  const groupName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft"

  return (
    <span>
      {selected && (
        <>
          <IconButton
            touch
            tooltip={messages.actions_delete}
            tooltipPosition="bottom-left"
            onClick={() => setOpenDelete(true)}
          >
            <Delete />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle
            itemsCount={1}
            itemName={groupName}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteGroup}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.customerGroups_titleAdd}
        onClick={onCreate}
      >
        <Add htmlColor="#fff" />
      </IconButton>
    </span>
  )
}

export default Buttons
