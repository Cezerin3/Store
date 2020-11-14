import { Button, Paper } from "@material-ui/core"
import MenuItem from "material-ui/MenuItem"
import { RadioButton } from "material-ui/RadioButton"
import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import {
  RadioButtonGroup,
  SelectField,
  TextField,
} from "redux-form-material-ui"
import { messages } from "../../../../lib"
import style from "./style.module.sass"

const radioButtonStyle = {
  marginTop: 14,
  marginBottom: 14,
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "notes",
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required"
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address"
  }
  return errors
}

let selectFieldValuesFirst = null
let selectFieldValuesSecond = null
let selectFieldValuesThird = null

interface props {
  handleSubmit
  pristine
  submitting
  initialValues
}

const CommerceForm = (props: props) => {
  const [isSelectField, setIsSelectField] = useState(false)
  const [isTextField, setIsTextField] = useState(false)
  const [isServiceOptions, setIsServiceOptions] = useState(false)
  const [isServiceOptionsCalled, setIsServiceOptionsCalled] = useState(false)

  const { handleSubmit, pristine, submitting } = props

  useEffect(() => {
    //props.initialize({ name: 'serviceOptions' });

    selectFieldValuesFirst = {
      1: messages.service_delivery,
    }
    selectFieldValuesSecond = {
      2: messages.service_togo,
    }
    selectFieldValuesThird = {
      3: messages.service_delivery_togo,
    }
  }, [])

  useEffect(() => {
    props.onLoad()
  }, [])

  useEffect(() => {
    if (props.initialValues !== undefined && !isServiceOptionsCalled) {
      const getIsServiceOptions =
        props.initialValues.status.indexOf(messages.commerce_formRestaurant) !==
        -1
      const getIsTextField =
        props.initialValues.serviceOptions.indexOf(
          selectFieldValuesFirst[1]
        ) !== -1
      setIsServiceOptions(getIsServiceOptions)
      setIsServiceOptionsCalled(true)
      setIsTextField(getIsTextField)
    }
  }, [])

  const setTextField = index => {
    const getIsTextField =
      index.indexOf(selectFieldValuesFirst[1]) !== -1 || false
    setIsTextField(getIsTextField)
  }

  const setSelectField = event => {
    const getIsSelectField =
      event.target.value.indexOf(messages.commerce_formRestaurant) !== -1 ||
      false
    setIsSelectField(getIsSelectField)
    setIsServiceOptions(getIsSelectField)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <Paper className="paper-box" elevation={4}>
        <div className={style.innerBox}>
          <p>{messages.commerce_formInfo}</p>
          <div className="blue-title">{messages.commerce_forms}</div>
          <>
            <Field
              name="status"
              component={RadioButtonGroup}
              onChange={event => setSelectField(event)}
            >
              <RadioButton
                value={messages.commerce_formRestaurant}
                label={messages.commerce_formRestaurant}
                style={radioButtonStyle}
              />
              <RadioButton
                value={messages.commerce_formEshop}
                label={messages.commerce_formEshop}
                style={radioButtonStyle}
              />
              <RadioButton
                value={messages.commerce_formWholesale}
                label={messages.commerce_formWholesale}
                style={radioButtonStyle}
              />
            </Field>
          </>
          <>
            {(isSelectField || isServiceOptions) && (
              <Field
                name="serviceOptions"
                component={SelectField}
                fullWidth
                label={messages.service_options}
                hintText={messages.service_options_initial_value}
                floatingLabelText={messages.service_options_initial_value}
                onChange={(event, index, next) => setTextField(index)}
              >
                <MenuItem
                  value={selectFieldValuesFirst[1]}
                  primaryText={messages.service_delivery}
                />
                <MenuItem
                  value={selectFieldValuesSecond[2]}
                  primaryText={messages.service_togo}
                />
                <MenuItem
                  value={selectFieldValuesThird[3]}
                  primaryText={messages.service_delivery_togo}
                />
              </Field>
            )}
          </>
          <>
            {isTextField && (isSelectField || isServiceOptions) && (
              <Field
                component={TextField}
                fullWidth
                name="deliveryRadius"
                hintText={messages.delivery_radius}
                floatingLabelText={messages.delivery_radius}
              />
            )}
          </>
        </div>
        <div className="buttons-box">
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
  )
}

export default reduxForm({
  form: "CommerceForm",
  /*initialValues: {
		serviceOptions: {
			value: "myFirstName"
		}
	},*/
  /*initialValues: {
		serviceOptions: 'defaultValue'
	},*/
  //keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  //updateUnregisteredFields: true
})(CommerceForm)
