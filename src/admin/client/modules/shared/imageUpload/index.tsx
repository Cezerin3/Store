import { Paper } from "@material-ui/core"
import { CloudUpload, Delete, PhotoCamera } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import Snackbar from "material-ui/Snackbar"
import React from "react"
import Dropzone from "react-dropzone"
import { messages } from "../../../lib"
import style from "./style.module.sass"

class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imagePreview: this.props.imageUrl,
    }
  }

  onDelete = () => {
    this.setState({
      imagePreview: null,
    })
    this.props.onDelete()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      imagePreview: nextProps.imageUrl,
    })
  }

  onDrop = files => {
    let form = new FormData()
    form.append("file", files[0])
    this.props.onUpload(form)
  }

  render() {
    const { imagePreview } = this.state
    const { uploading } = this.props

    const hasPreview = imagePreview !== null && imagePreview !== ""
    const previewIsFileUrl = hasPreview ? imagePreview.startsWith("http") : null

    let htmlPreview = (
      <div className={style.noImage}>
        <PhotoCamera style={{ fontSize: 90, color: "#cccccc" }} />
        <div className={style.dropText}>{messages.help_dropHere}</div>
      </div>
    )

    if (hasPreview && previewIsFileUrl) {
      htmlPreview = <img src={imagePreview} />
    } else if (hasPreview && !previewIsFileUrl) {
      htmlPreview = <img src={imagePreview} />
    }

    return (
      <Paper elevation={4} square style={{ width: 200 }}>
        <Dropzone
          onDrop={this.onDrop}
          multiple={false}
          disableClick={hasPreview}
          accept="image/*"
          ref={node => {
            this.dropzone = node
          }}
          style={{}}
          className={style.dropzone}
          activeClassName={style.dropzoneActive}
          rejectClassName={style.dropzoneReject}
        >
          <div className={style.preview}>{htmlPreview}</div>
        </Dropzone>

        <div className={style.footer}>
          <IconButton
            touch={true}
            tooltip={messages.actions_upload}
            onClick={() => {
              this.dropzone.open()
            }}
            tooltipPosition="top-right"
          >
            <CloudUpload htmlColor="rgba(0,0,0,0.5)" />
          </IconButton>
          {hasPreview && (
            <IconButton
              touch
              tooltip={messages.actions_delete}
              onClick={this.onDelete}
              tooltipPosition="top-right"
            >
              <Delete htmlColor="rgba(0,0,0,0.5)" />
            </IconButton>
          )}
        </div>
        <Snackbar open={uploading} message={messages.messages_uploading} />
      </Paper>
    )
  }
}

export default ImageUpload
