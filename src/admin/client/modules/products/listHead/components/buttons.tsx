import { Button } from "@material-ui/core"
import { Add, Delete, Folder } from "@material-ui/icons"
import Dialog from "material-ui/Dialog"
import IconButton from "material-ui/IconButton"
import React, { FC, useState } from "react"
import { messages } from "../../../../lib"
import CategorySelect from "../../../productCategories/select"
import DeleteConfirmation from "../../../shared/deleteConfirmation"
import Search from "./search"

interface props {
  search: string
  setSearch: Function
  selectedCount: number
  onDelete: Function
  onCreate: Function
  onImportProducts: Function
  onMoveTo: Function
}

const Buttons: FC<props> = (props: props) => {
  const [categoryIdMoveTo, setCategoryIdMoveTo] = useState(null)
  const [openMoveTo, setOpenMoveTo] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const {
    search,
    setSearch,
    selectedCount,
    onDelete,
    onCreate,
    onImportProducts,
    onMoveTo,
  } = props

  const deleteProduct = () => {
    setOpenDelete(false)
    onDelete()
  }

  const closeMoveTo = () => {
    setOpenMoveTo(false)
  }

  const saveMoveTo = () => {
    setOpenMoveTo(false)
    onMoveTo(categoryIdMoveTo)
  }

  const actionsMoveTo = [
    <Button
      variant="contained"
      color="primary"
      onClick={closeMoveTo}
      style={{ marginRight: 10 }}
    >
      {messages.cancel}
    </Button>,
    <Button
      variant="contained"
      color="primary"
      focusRipple
      onClick={saveMoveTo}
    >
      {messages.actions_moveHere}
    </Button>,
  ]

  return (
    <>
      <Search value={search} setSearch={setSearch} />
      {selectedCount > 0 && (
        <>
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
            tooltip={messages.actions_moveTo}
            onClick={() => setOpenMoveTo(true)}
          >
            <Folder htmlColor="#fff" />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle={false}
            itemsCount={selectedCount}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteProduct}
          />
          <Dialog
            title={messages.actions_moveTo}
            actions={actionsMoveTo}
            modal={false}
            open={openMoveTo}
            onRequestClose={closeMoveTo}
            autoScrollBodyContent
          >
            <CategorySelect
              onSelect={categoryId => setCategoryIdMoveTo(categoryId)}
              selectedId={categoryIdMoveTo}
              opened
            />
          </Dialog>
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.addProduct}
        onClick={() => onCreate()}
      >
        <Add htmlColor="#fff" />
      </IconButton>
    </>
  )
}

export default Buttons
