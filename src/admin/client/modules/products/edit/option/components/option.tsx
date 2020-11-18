import { Button, Paper } from "@material-ui/core"
import MenuItem from "material-ui/MenuItem"
import React, { FC, useEffect } from "react"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { SelectField, TextField } from "redux-form-material-ui"
import { messages } from "../../../../../lib"
import { CustomToggle } from "../../../../shared/form"
import style from "./style.module.sass"
import OptionValues from "./values"

interface props {
  pristine: boolean
  reset: Function
  submitting: boolean
  deleteOption: Function
  optionValues: []
  createOptionValue: Function
  updateOptionValue: Function
  deleteOptionValue: Function
  fetchData: Function
}

const validate = (values: props) => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const ProductOptionForm: FC<
  props & InjectedFormProps<props, { handleSubmit: Function }, string>
> = (
  props: props & InjectedFormProps<props, { handleSubmit: Function }, string>
) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    deleteOption,
    optionValues,
    createOptionValue,
    updateOptionValue,
    deleteOptionValue,
    fetchData,
  } = props

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className="paper-box" elevation={4}>
          <div className={style.innerBox}>
            <Field
              name="name"
              component={TextField}
              floatingLabelText={messages.optionName}
              fullWidth
            />
            <div className="row">
              <div className="col-xs-6">
                <Field
                  name="position"
                  component={TextField}
                  type="number"
                  floatingLabelText={messages.position}
                  fullWidth
                />
              </div>
              <div className="col-xs-6">
                <Field
                  component={SelectField}
                  autoWidth
                  fullWidth
                  name="control"
                  floatingLabelText={messages.optionControl}
                >
                  <MenuItem
                    value="select"
                    primaryText={messages.optionControlSelect}
                  />
                </Field>
              </div>
            </div>
            <div className={style.shortControl}>
              <Field
                name="required"
                component={CustomToggle}
                label={messages.settings_fieldRequired}
              />
            </div>
          </div>
          <div className="buttons-box">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteOption}
            >
              {messages.actions_delete}
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 12 }}
              onClick={reset}
              disabled={pristine || submitting}
            >
              {messages.cancel}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={style.button}
              disabled={pristine || submitting}
            >
              {messages.save}
            </Button>
          </div>
        </Paper>
      </form>
      <OptionValues
        optionValues={optionValues}
        createOptionValue={createOptionValue}
        updateOptionValue={updateOptionValue}
        deleteOptionValue={deleteOptionValue}
      />
    </>
  )
}

export default reduxForm({
  form: "ProductOptionForm",
  validate,
  enableReinitialize: true,
})(ProductOptionForm)
