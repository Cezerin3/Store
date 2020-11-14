import { Delete, OpenInNew } from "@material-ui/icons"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import React, { FC, useState } from "react"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

interface props {
  product
  onDelete: Function
}

const Buttons: FC<props> = (props: props) => {
  const [openDelete, setOpenDelete] = useState(false)

  const { product, onDelete } = props

  const handleDelete = () => {
    setOpenDelete(false)
    onDelete()
  }

  const productName =
    product && product.name && product.name.length > 0 ? product.name : "Draft"

  return (
    <>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.deleteProduct}
        onClick={() => setOpenDelete(true)}
      >
        <Delete htmlColor="#fff" />
      </IconButton>
      {product && product.enabled && (
        <a href={product.url} target="_blank">
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
        itemName={productName}
        onCancel={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />
    </>
  )
}

export default Buttons
