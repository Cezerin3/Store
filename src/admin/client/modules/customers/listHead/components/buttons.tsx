import { Button } from "@material-ui/core"
import { Delete, Folder } from "@material-ui/icons"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import IconButton from "material-ui/IconButton"
import React, { FC, useState } from "react"
import GroupSelect from "../../../customerGroups/select"
import DeleteConfirmation from "../../../shared/deleteConfirmation"
import Search from "./search"

interface props {
  search
  setSearch
  selectedCount
  onDelete: Function
  onSetGroup
}

const Buttons: FC<props> = (props: props) => {
  const [groupId, setGroupId] = useState(null)
  const [openSetGroup, setOpenSetGroup] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { search, setSearch, selectedCount, onDelete, onSetGroup } = props

  const deleteCustomers = () => {
    setOpenDelete(false)
    onDelete()
  }

  const saveSetGroup = () => {
    setOpenSetGroup(false)
    onSetGroup(groupId)
  }

  const actionsSetGroup = [
    <Button
      variant="contained"
      color="primary"
      onClick={() => setOpenSetGroup(false)}
      style={{ marginRight: 10 }}
    >
      {messages.cancel}
    </Button>,
    <Button
      variant="contained"
      color="primary"
      focusRipple
      onClick={saveSetGroup}
    >
      {messages.save}
    </Button>,
  ]

  return (
    <span>
      <Search value={search} setSearch={setSearch} />
      {selectedCount > 0 && (
        <span>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={() => setOpenDelete(true)}
          >
            <Delete htmlColor="#fff" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.customers_setGroup}
            onClick={() => setOpenSetGroup(true)}
          >
            <Folder htmlColor="#fff" />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle={false}
            itemsCount={selectedCount}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteCustomers}
          />
          <Dialog
            title={messages.customers_setGroup}
            actions={actionsSetGroup}
            modal={false}
            open={openSetGroup}
            onRequestClose={() => setOpenSetGroup(false)}
            autoScrollBodyContent
          >
            <GroupSelect
              onSelect={groupID => setGroupId(groupID)}
              selectedId={groupId}
              showRoot
              showAll={false}
            />
          </Dialog>
        </span>
      )}
    </span>
  )
}

export default Buttons
