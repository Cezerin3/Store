import { Button } from "@material-ui/core"
import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Delete,
  Folder,
} from "@material-ui/icons"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import IconButton from "material-ui/IconButton"
import React, { FC, useState } from "react"
import CategorySelect from "../../../productCategories/select"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

interface props {
  selected
  onMoveUp
  onMoveDown
  onDelete: Function
  onCreate
  onMoveTo: Function
}

const Buttons: FC<props> = (props: props) => {
  const [categoryIdMoveTo, setCategoryIdMoveTo] = useState("root")
  const [openMoveTo, setOpenMoveTo] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { selected, onMoveUp, onMoveDown, onDelete, onCreate, onMoveTo } = props

  const closeMoveTo = () => {
    setOpenMoveTo(false)
  }

  const deleteCategory = () => {
    setOpenDelete(false)
    onDelete(props.selected.id)
  }

  const saveMoveTo = () => {
    setOpenMoveTo(false)
    onMoveTo(categoryIdMoveTo)
  }

  const categoryName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft"

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
    <span>
      {selected && (
        <>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveUp}
            onClick={onMoveUp}
          >
            <ArrowUpward htmlColor="#fff" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveDown}
            onClick={onMoveDown}
          >
            <ArrowDownward htmlColor="#fff" />
          </IconButton>
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
              showRoot
              showAll={false}
            />
          </Dialog>
          <DeleteConfirmation
            open={openDelete}
            isSingle
            itemsCount={1}
            itemName={categoryName}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteCategory}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.productCategories_titleAdd}
        onClick={onCreate}
      >
        <Add htmlColor="#fff" />
      </IconButton>
    </span>
  )
}

export default Buttons
