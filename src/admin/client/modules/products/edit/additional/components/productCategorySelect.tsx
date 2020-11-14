import { Button } from "@material-ui/core"
import { Create } from "@material-ui/icons"
import Dialog from "material-ui/Dialog"
import React, { useState } from "react"
import { messages } from "../../../../../lib"
import CategorySelect from "../../../../productCategories/select"

const ProductCategorySelect = props => {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
  }

  const handleSelect = categoryId => {
    props.input.onChange(categoryId)
  }

  const { categories, input } = props
  const selectedCategoryId = input.value
  const category = categories.find(item => item.id === selectedCategoryId)
  const categoryName = category ? category.name : ""

  const dialogButtons = [
    <Button
      variant="contained"
      color="primary"
      onClick={close}
      style={{ marginRight: 10 }}
    >
      {messages.cancel}
    </Button>,
    <Button variant="contained" color="primary" focusRipple onClick={close}>
      {messages.save}
    </Button>,
  ]

  return (
    <>
      <Dialog
        title={messages.category}
        actions={dialogButtons}
        modal={false}
        open={open}
        onRequestClose={close}
        autoScrollBodyContent
      >
        <CategorySelect
          onSelect={handleSelect}
          selectedId={selectedCategoryId}
          opened={false}
        />
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Create htmlColor="#777" />}
        onClick={() => setOpen(true)}
      >
        {categoryName}
      </Button>
    </>
  )
}

export default ProductCategorySelect
