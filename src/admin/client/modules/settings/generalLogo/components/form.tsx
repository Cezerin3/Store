import { Paper } from "@material-ui/core"
import React, { FC, useEffect } from "react"
import ImageUpload from "../../../shared/imageUpload"

interface props {
  onImageUpload
  onImageDelete
  settings
  onLoad: Function
}

const GeneralLogoSettingsForm: FC<props> = (props: props) => {
  const { onImageUpload, onImageDelete, settings, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  let imageUrl = settings && settings.logo ? settings.logo : ""

  return (
    <Paper className="paper-box" elevation={4}>
      <div style={{ padding: 30 }}>
        <ImageUpload
          uploading={false}
          imageUrl={imageUrl}
          onDelete={onImageDelete}
          onUpload={onImageUpload}
        />
      </div>
    </Paper>
  )
}

export default GeneralLogoSettingsForm
