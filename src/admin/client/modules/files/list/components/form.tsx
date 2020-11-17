import { Paper } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import moment from "moment"
import React, { useEffect } from "react"
import { helper, messages } from "../../../../lib"
import DeleteConfirmation from "../../../shared/deleteConfirmation"
import FileUploader from "./fileUploader"
import style from "./style.module.sass"

const iconButtonElement = (
  <IconButton touch>
    <MoreVert htmlColor="rgb(189, 189, 189)" />
  </IconButton>
)

class FileItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDelete: false,
    }
  }

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  hideDelete = () => {
    this.setState({ openDelete: false })
  }

  handleDelete = () => {
    const fileName = this.props.file.file
    this.props.onDelete(fileName)
    this.hideDelete()
  }

  render() {
    const { file, settings } = this.props
    const fileName = file.file
    const fileUrl = `${settings.domain}/${file.file}`
    const modifiedDate = moment(file.modified)
    const modifiedDateFormated = modifiedDate.format(`${settings.date_format}`)
    const fileSizeFormated = helper.formatFileSize(file.size)

    return (
      <div className={style.item + " row row--no-gutter middle-xs"}>
        <div className={style.name + " col-xs-5"}>
          <a href={fileUrl} target="_blank" rel="noopener">
            {file.file}
          </a>
        </div>
        <div className={style.date + " col-xs-3"}>{modifiedDateFormated}</div>
        <div className={style.size + " col-xs-2"}>{fileSizeFormated}</div>
        <div className={style.more + " col-xs-2"}>
          <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onClick={this.showDelete}>
              {messages.actions_delete}
            </MenuItem>
          </IconMenu>
          <DeleteConfirmation
            open={this.state.openDelete}
            isSingle={true}
            itemsCount={1}
            itemName={fileName}
            onCancel={this.hideDelete}
            onDelete={this.handleDelete}
          />
        </div>
      </div>
    )
  }
}

const FileList = props => {
  const { files, settings, onDelete, onUpload, uploading } = props

  useEffect(() => {
    props.onLoad()
  }, [])

  let listItems = files.map((file, index) => (
    <FileItem key={index} file={file} settings={settings} onDelete={onDelete} />
  ))

  return (
    <>
      <div className={style.head + " row row--no-gutter"}>
        <div className="col-xs-5">{messages.fileName}</div>
        <div className="col-xs-3">{messages.fileModified}</div>
        <div className="col-xs-2">{messages.fileSize}</div>
        <div className="col-xs-2" />
      </div>
      <Paper className="paper-box" elevation={4}>
        {listItems}
      </Paper>
      <FileUploader onUpload={onUpload} uploading={uploading} />
    </>
  )
}

export default FileList
