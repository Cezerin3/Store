import { Button } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import Dialog from "material-ui/Dialog"
import React, { useState } from "react"
import { messages } from "../../../../../lib"
import CategoryMultiselect from "../../../../productCategories/components/multiselectList"

const CategoryItemActions = ({ fields, index }) => (
  <a
    title={messages.actions_delete}
    onClick={() => fields.remove(index)}
    className="react-tagsinput-remove"
  />
)

const CategoryItem = ({ categoryName, actions }) => (
  <span className="react-tagsinput-tag">
    {categoryName}
    {actions}
  </span>
)

const ProductCategoryMultiSelect = props => {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
  }

  const handleCheck = categoryId => {
    const selectedIds = props.fields.getAll()
    if (selectedIds && selectedIds.includes(categoryId)) {
      // remove
      props.fields.forEach((name, index, fields) => {
        if (fields.get(index) === categoryId) {
          fields.remove(index)
          return
        }
      })
    } else {
      // add
      props.fields.push(categoryId)
    }
  }

  const { categories, fields } = props
  const selectedIds = fields.getAll()

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
    <div className="react-tagsinput">
      <span>
        {fields.map((field, index) => {
          const categoryId = fields.get(index)
          const category = categories.find(item => item.id === categoryId)
          const categoryName = category ? category.name : "-"
          const actions = <CategoryItemActions fields={fields} index={index} />
          return (
            <CategoryItem
              key={index}
              categoryName={categoryName}
              actions={actions}
            />
          )
        })}
        <Dialog
          title={messages.additionalCategories}
          actions={dialogButtons}
          modal={false}
          open={open}
          onRequestClose={close}
          autoScrollBodyContent={true}
        >
          <CategoryMultiselect
            items={categories}
            selectedIds={selectedIds}
            opened={false}
            onCheck={handleCheck}
          />
        </Dialog>
        <Button
          variant="contained"
          color="primary"
          style={{ minWidth: 52 }}
          onClick={() => setOpen(true)}
        >
          <Add htmlColor="#333" />
        </Button>
      </span>
    </div>
  )
}

export default ProductCategoryMultiSelect
