import { Delete, OpenInNew } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import React, { useState } from "react"
import { messages } from "../../../../lib"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

const Buttons = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const deletePage = () => {
    setOpenDelete(false)
    props.onDelete(props.page.id)
  }

  const { page } = props
  const pageName =
    page && page.meta_title && page.meta_title.length > 0
      ? page.meta_title
      : "Draft"

  if (page && !page.is_system) {
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
        {page.enabled && (
          <a href={page.url} target="_blank">
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.viewOnWebsite}
            >
              <OpenInNew htmlColor="#fff" />
            </IconButton>
          </a>
        )}
        <DeleteConfirmation
          open={openDelete}
          isSingle
          itemsCount={1}
          itemName={pageName}
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
