import { Button, Paper } from "@material-ui/core"
import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import { messages } from "../../../../../lib"
import style from "./style.module.sass"

const validate = values => {
  const errors = {}
  const requiredFields = ["from", "to"]

  requiredFields.map(field => {
    if (!values.is_system && values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

interface props {
  handleSubmit
  pristine
  submitting
  redirectId
  onLoad: Function
}

const EditRedirectForm = (props: props) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { handleSubmit, pristine, submitting, redirectId } = props
  const isAdd = redirectId === null || redirectId === undefined

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className="paper-box" elevation={4}>
          <div className={style.innerBox}>
            <Field
              name="from"
              component={TextField}
              floatingLabelText="From (e.g. /old-path)"
              fullWidth
            />
            <Field
              name="to"
              component={TextField}
              floatingLabelText="To (e.g. /new-path)"
              fullWidth
            />
          </div>
          <div
            className={`buttons-box ${
              pristine && !isAdd ? "buttons-box-pristine" : "buttons-box-show"
            }`}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={style.button}
              disabled={pristine || submitting}
            >
              {isAdd ? messages.add : messages.save}
            </Button>
          </div>
        </Paper>
      </form>
    </>
  )
}

export default reduxForm({
  form: "EditRedirectForm",
  validate,
  enableReinitialize: true,
})(EditRedirectForm)
