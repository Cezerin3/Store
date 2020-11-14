import React from "react"
import { api } from "../../../../lib"
import ImageUpload from "../../../shared/imageUpload"

const ThemeImageUpload = props => {
  const onDelete = () => {
    const fileName = props.input.value
    api.theme.assets.deleteFile(fileName).then(() => {
      props.input.onChange("")
    })
  }

  const onUpload = formData => {
    api.theme.assets.uploadFile(formData).then(({ status, json }) => {
      const fileName = json.file
      props.input.onChange(fileName)
    })
  }

  let { input, label } = props
  const imageUrl =
    input.value && input.value.length > 0
      ? "/assets/images/" + input.value
      : null

  return (
    <>
      <p>{label}</p>
      <ImageUpload
        uploading={false}
        imageUrl={imageUrl}
        onDelete={onDelete}
        onUpload={onUpload}
      />
    </>
  )
}

export default ThemeImageUpload
