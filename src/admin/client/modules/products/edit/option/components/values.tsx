import { Paper } from "@material-ui/core"
import { AddCircle, Delete } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import React, { useState } from "react"
import { messages } from "../../../../../lib"
import style from "./style.module.sass"

const OptionValueEdit = props => {
  const [value, setValue] = useState(props.value.name)

  const onBlur = e => {
    props.onChange(props.value.id, value)
  }

  const onDelete = () => {
    props.onDelete(props.value.id)
  }

  return (
    <div className={style.gridRow}>
      <div className={style.gridColInput}>
        <input
          type="text"
          className={style.textInput}
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className={style.gridColButton}>
        <IconButton
          title={messages.actions_delete}
          onClick={onDelete}
          tabIndex={-1}
        >
          <Delete htmlColor="#a1a1a1" />
        </IconButton>
      </div>
    </div>
  )
}

const OptionValueAdd = props => {
  const [value, setValue] = useState("")

  const onCreate = () => {
    if (value !== "") {
      props.onCreate(value)
      setValue("")
    }
  }

  function handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) {
      onCreate()
    }
  }

  return (
    <div className={style.gridRow}>
      <div className={style.gridColInput}>
        <input
          type="text"
          className={style.textInput}
          value={value}
          placeholder={messages.newOptionValue}
          onChange={({ target }) => setValue(target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={style.gridColButton}>
        <IconButton title={messages.add} onClick={onCreate} tabIndex={-1}>
          <AddCircle htmlColor="#a1a1a1" />
        </IconButton>
      </div>
    </div>
  )
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
