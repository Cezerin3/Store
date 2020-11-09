import FontIcon from "material-ui/FontIcon"
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
    this.props.onDelete(this.props.redirect.id)
  }

  render() {
    const { redirect } = this.props
    const redirectName =
      redirect && redirect.from && redirect.from.length > 0
        ? redirect.from
        : "Draft"

    if (redirect) {
      return (
        <>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={this.openDelete}
          >
            <FontIcon color="#fff" className="material-icons">
              delete
            </FontIcon>
          </IconButton>
          <DeleteConfirmation
            open={this.state.openDelete}
            isSingle
            itemsCount={1}
            itemName={redirectName}
            onCancel={this.closeDelete}
            onDelete={this.deletePage}
          />
        </>
      )
    }
    return null
  }
}

export default Buttons
