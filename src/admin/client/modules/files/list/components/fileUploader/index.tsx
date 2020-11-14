import { Button } from "@material-ui/core"
import Snackbar from "material-ui/Snackbar"
import React from "react"
import Dropzone from "react-dropzone"
import { messages } from "../../../../../lib"
import style from "./style.module.sass"

const MultiUploader = props => {
  const onDrop = files => {
    let form = new FormData()
    files.map(file => {
      form.append("file", file)
    })
    props.onUpload(form)
  }

  const { uploading } = props
  return (
    <>
      <Dropzone
        onDrop={onDrop}
        multiple={true}
        disableClick={true}
        ref={node => {
          dropzone = node
        }}
        style={{}}
        className={style.dropzone + (uploading ? " " + style.uploading : "")}
        activeClassName={style.dropzoneActive}
        rejectClassName={style.dropzoneReject}
      >
        <div className={style.dropzoneEmpty}>
          {messages.help_dropHere}
          <Button
            className={style.button}
            onClick={() => {
              dropzone.open()
            }}
          >
            {messages.chooseImage}
          </Button>
        </div>
      </Dropzone>

      <Snackbar open={uploading} message={messages.messages_uploading} />
    </>
  )
}

export default MultiUploader
