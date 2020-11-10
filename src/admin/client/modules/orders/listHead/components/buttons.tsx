import { Add, Delete } from "@material-ui/icons"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import React from "react"
import DeleteConfirmation from "../../../shared/deleteConfirmation"
import Search from "./search"

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

  deleteOrders = () => {
    this.setState({ openDelete: false })
    this.props.onDelete()
  }

  render() {
    const { search, setSearch, selectedCount, onDelete, onCreate } = this.props

    return (
      <>
        <Search value={search} setSearch={setSearch} />
        {selectedCount > 0 && (
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
              isSingle={false}
              itemsCount={selectedCount}
              onCancel={this.closeDelete}
              onDelete={this.deleteOrders}
            />
          </>
        )}
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.orders_titleAdd}
          onClick={onCreate}
        >
          <Add htmlColor="#fff" />
        </IconButton>
      </>
    )
  }
}

export default Buttons
