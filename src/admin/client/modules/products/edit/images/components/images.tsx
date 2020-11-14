import { Button, Paper } from "@material-ui/core"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import TextField from "material-ui/TextField"
import React, { useState } from "react"
import Gallery from "../../../../shared/imageUploadMultiple"

const ProductImages = props => {
  const [openEdit, setOpenEdit] = useState(false)
  const [imageData, setImageData] = useState(null)

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const handleEditOpen = image => {
    setImageData(image)
    setOpenEdit(true)
  }

  const handleEditSave = () => {
    props.onImageUpdate(imageData)
    closeEdit()
  }

  const handleAltChange = (event, value) => {
    const newImageData = Object.assign({}, imageData, {
      alt: value,
    })
    setImageData(newImageData)
  }

  const {
    productId,
    images,
    onImageDelete,
    onImageSort,
    onImageUpload,
    uploadingImages,
  } = props

  const alt = imageData ? imageData.alt : ""

  const dialogButtons = [
    <Button
      variant="contained"
      color="primary"
      onClick={closeEdit}
      style={{ marginRight: 10 }}
    >
      {messages.cancel}
    </Button>,
    <Button
      variant="contained"
      color="primary"
      focusRipple
      onClick={handleEditSave}
    >
      {messages.save}
    </Button>,
  ]

  return (
    <Paper className="paper-box" elevation={4}>
      <div style={{ padding: "10px 10px 30px 10px" }}>
        <Gallery
          productId={productId}
          images={images}
          onImageDelete={onImageDelete}
          onImageSort={onImageSort}
          onImageUpload={onImageUpload}
          uploading={uploadingImages}
          onImageEdit={handleEditOpen}
        />
        <Dialog
          contentStyle={{ maxWidth: 540 }}
          title={messages.edit}
          actions={dialogButtons}
          modal={false}
          open={openEdit}
          onRequestClose={closeEdit}
          autoScrollBodyContent={false}
        >
          <TextField
            floatingLabelText={messages.alt}
            fullWidth
            value={alt}
            onChange={handleAltChange}
          />
        </Dialog>
      </div>
    </Paper>
  )
}

export default ProductImages
