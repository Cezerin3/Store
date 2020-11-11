import { Delete } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import React from "react"
import { messages } from "../../../../lib"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDelete: false,
    }
  }

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteGroup = () => {
    this.setState({ openDelete: false })
    this.props.onDelete(this.props.shippingMethod.id)
  }

  render() {
    const { shippingMethod, onDelete } = this.props
    const methodName =
      shippingMethod && shippingMethod.name && shippingMethod.name.length > 0
        ? shippingMethod.name
        : "Draft"

    return (
      <span>
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.actions_delete}
          onClick={this.showDelete}
        >
          <Delete htmlColor="#fff" />
        </IconButton>
        <DeleteConfirmation
          open={this.state.openDelete}
          isSingle={true}
          itemsCount={1}
          itemName={methodName}
          onCancel={this.closeDelete}
          onDelete={this.deleteGroup}
        />
      </span>
    )
  }
}

export default Buttons
