import { Button } from "@material-ui/core"
import Snackbar from "material-ui/Snackbar"
import React from "react"
import Dropzone from "react-dropzone"
import { messages } from "../../../lib"
import style from "./style.module.sass"

const MultiUploader = props => {
  const onDrop = files => {
    let form = new FormData()
    files.map(file => {
      form.append("file", file)
    })

    console.log(files)

    console.log(form)

    props.onUpload(form)
  }

  const { uploading } = props

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        multiple
        disableClick
        accept="image/*"
        ref={node => {
          dropzone = node
        }}
        style={{}}
        className={style.dropzone}
        activeClassName={style.dropzoneActive}
        rejectClassName={style.dropzoneReject}
      >
        {props.children}
        {!props.children && (
          <div className={style.dropzoneEmpty}>{messages.help_dropHere}</div>
        )}
      </Dropzone>

      {!uploading && (
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: 20, marginTop: 10 }}
          onClick={() => {
            dropzone.open()
          }}
        >
          {messages.chooseImage}
        </Button>
      )}

      <Snackbar open={uploading} message={messages.messages_uploading} />
    </>
  )
}

export default MultiUploader
