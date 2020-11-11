import { Paper } from "@material-ui/core"
import { AddCircle, Delete } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import React from "react"
import { messages } from "../../../../../lib"
import style from "./style.module.sass"

class OptionValueEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value.name,
    }
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  onBlur = e => {
    this.props.onChange(this.props.value.id, this.state.value)
  }

  onDelete = () => {
    this.props.onDelete(this.props.value.id)
  }

  render() {
    const { value } = this.state

    return (
      <div className={style.gridRow}>
        <div className={style.gridColInput}>
          <input
            type="text"
            className={style.textInput}
            value={value}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
        </div>
        <div className={style.gridColButton}>
          <IconButton
            title={messages.actions_delete}
            onClick={this.onDelete}
            tabIndex={-1}
          >
            <Delete htmlColor="#a1a1a1" />
          </IconButton>
        </div>
      </div>
    )
  }
}

class OptionValueAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    }
    this.onChange = this.onChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  onCreate = () => {
    if (this.state.value !== "") {
      this.props.onCreate(this.state.value)
      this.setState({ value: "" })
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) {
      this.onCreate()
    }
  }

  render() {
    const { value } = this.state

    return (
      <div className={style.gridRow}>
        <div className={style.gridColInput}>
          <input
            type="text"
            className={style.textInput}
            value={value}
            placeholder={messages.newOptionValue}
            onChange={this.onChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className={style.gridColButton}>
          <IconButton
            title={messages.add}
            onClick={this.onCreate}
            tabIndex={-1}
          >
            <AddCircle htmlColor="#a1a1a1" />
          </IconButton>
        </div>
      </div>
    )
  }
}

const OptionValues = ({
  optionValues,
  createOptionValue,
  updateOptionValue,
  deleteOptionValue,
}) => {
  const valueRows = optionValues.map((value, index) => (
    <OptionValueEdit
      key={index}
      value={value}
      onChange={updateOptionValue}
      onDelete={deleteOptionValue}
    />
  ))

  return (
    <Paper className="paper-box" elevation={4}>
      <div className="blue-title" style={{ padding: "20px 30px" }}>
        {messages.optionValues}
      </div>
      <div className={style.grid}>
        {valueRows}
        <OptionValueAdd onCreate={createOptionValue} />
      </div>
    </Paper>
  )
}

export default OptionValues
