import { Delete } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import React from "react"
import { messages } from "../../../../../lib"
import DeleteConfirmation from "../../../../shared/deleteConfirmation"

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDelete: false,
    }
  }

  openDelete = () => {
    this.setState({ openDelete: true })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deletePage = () => {
    this.setState({ openDelete: false })
    this.props.onDelete(this.props.webhook.id)
  }

  render() {
    const { webhook } = this.props
    const webhookName =
      webhook && webhook.url && webhook.url.length > 0 ? webhook.url : "Draft"

    if (webhook) {
      return (
        <>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={this.openDelete}
          >
            <Delete htmlColor="#fff" />
          </IconButton>
          <DeleteConfirmation
            open={this.state.openDelete}
            isSingle
            itemsCount={1}
            itemName={webhookName}
            onCancel={this.closeDelete}
            onDelete={this.deletePage}
          />
        </>
      )
    } else {
      return null
    }
  }
}

export default Buttons
