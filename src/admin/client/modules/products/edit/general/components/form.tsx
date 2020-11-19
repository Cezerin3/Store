import { Button, Paper } from "@material-ui/core"
import React from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import { api, messages } from "../../../../../lib"
import Editor from "../../../../shared/editor"
import style from "./style.module.sass"

const validate = values => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const slugExists = values => {
  if (values.slug && values.slug.length > 0) {
    return api.products
      .slugExists(values.id, values.slug)
      .then(response => response.status === 200)
  } else {
    return Promise.resolve(false)
  }
}

const asyncValidate = values => {
  return Promise.all([slugExists(values)]).then(([isSlugExists]) => {
    let errors: { slug?: string } = {}

    if (isSlugExists) {
      errors.slug = messages.errors_urlTaken
    }

    if (Object.keys(errors).length > 0) {
      return Promise.reject(errors)
    } else {
      return Promise.resolve()
    }
  })
}

interface props {
  handleSubmit: Function
  pristine: boolean
  reset: Function
  submitting: boolean
  initialValues: Partial<any>
}

const ProductGeneralForm = (props: props) => {
  const { handleSubmit, pristine, reset, submitting, initialValues } = props
  if (initialValues) {
    return (
      <form onSubmit={() => handleSubmit}>
        <Paper className="paper-box" elevation={4}>
          <div className={style.innerBox}>
            <Field
              name="name"
              component={TextField}
              floatingLabelText={messages.products_name + " *"}
              fullWidth
            />
            <Field
              name="slug"
              component={TextField}
              floatingLabelText={messages.slug}
              fullWidth
            />
            <p className="field-hint">{messages.help_slug}</p>
            <Field
              name="meta_title"
              component={TextField}
              floatingLabelText={messages.pageTitle}
              fullWidth
            />
            <Field
              name="meta_description"
              component={TextField}
              floatingLabelText={messages.metaDescription}
              fullWidth
            />
            <div className="field-hint" style={{ marginTop: 40 }}>
              {messages.description}
            </div>
            <Field name="description" component={Editor} />
          </div>
          <div
            className={
              "buttons-box " +
              (pristine ? "buttons-box-pristine" : "buttons-box-show")
            }
          >
            <Button
              variant="contained"
              color="primary"
              className={style.button}
              onClick={() => reset}
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
    )
  } else {
    return null
  }
}

export default reduxForm({
  form: "ProductGeneralForm",
  validate,
  asyncValidate,
  asyncBlurFields: ["slug"],
  enableReinitialize: true,
})(ProductGeneralForm)
