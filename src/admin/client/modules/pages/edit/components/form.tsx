import { Button, Paper } from "@material-ui/core"
import React, { useEffect } from "react"
import TagsInput from "react-tagsinput"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import { api, messages } from "../../../../lib"
import Editor from "../../../shared/editor"
import { CustomToggle } from "../../../shared/form"
import style from "./style.module.sass"

const TagsField = ({ input, placeholder }) => {
  const tagsArray = input.value && Array.isArray(input.value) ? input.value : []
  return (
    <TagsInput
      value={tagsArray}
      inputProps={{ placeholder: placeholder }}
      onChange={tags => {
        input.onChange(tags)
      }}
    />
  )
}

const validate = values => {
  const errors = {}
  const requiredFields = ["slug", "meta_title"]

  requiredFields.map(field => {
    if (!values.is_system && values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const asyncValidate = (values /*, dispatch */) => {
  return new Promise((resolve, reject) => {
    if (!values.slug && values.is_system) {
      resolve()
    } else {
      api.sitemap.retrieve({ path: values.slug }).then(({ status, json }) => {
        if (status === 404) {
          resolve()
        } else {
          if (json && !Object.is(json.resource, values.id)) {
            reject({ slug: messages.errors_urlTaken })
          } else {
            resolve()
          }
        }
      })
    }
  })
}

interface props {
  handleSubmit
  pristine
  submitting
  initialValues
  pageId
}

const EditPageForm = props => {
  useEffect(() => {
    props.onLoad()
  }, [])

  useEffect(() => {
    return () => props.eraseData()
  }, [])

  const { handleSubmit, pristine, submitting, initialValues, pageId } = props
  const isAdd = pageId === null || pageId === undefined

  if (initialValues) {
    return (
      <form onSubmit={handleSubmit}>
        <Paper className="paper-box" elevation={4}>
          <div className={style.innerBox}>
            <Field
              name="meta_title"
              component={TextField}
              floatingLabelText={messages.pageTitle}
              fullWidth
            />
            <br />
            <Field
              name="slug"
              component={TextField}
              floatingLabelText={messages.slug}
              fullWidth
              disabled={initialValues.is_system}
            />
            <p className="field-hint">{messages.help_slug}</p>
            <Field
              name="meta_description"
              component={TextField}
              floatingLabelText={messages.metaDescription}
              fullWidth
            />
            <div className="field-hint" style={{ marginTop: 40 }}>
              {messages.content}
            </div>
            <div style={{ marginBottom: 50 }}>
              <Field name="content" component={Editor} />
            </div>
            {messages.tags}
            <Field
              name="tags"
              component={TagsField}
              placeholder={messages.newTag}
            />
            <div style={{ maxWidth: 256 }}>
              <Field
                component={CustomToggle}
                name="enabled"
                label={messages.enabled}
                style={{ paddingTop: 16, paddingBottom: 16 }}
                disabled={initialValues.is_system}
              />
            </div>
          </div>
          <div
            className={
              "buttons-box " +
              (pristine && !isAdd ? "buttons-box-pristine" : "buttons-box-show")
            }
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
    )
  } else {
    return null
  }
}

export default reduxForm({
  form: "EditPageForm",
  validate,
  asyncValidate,
  asyncBlurFields: ["slug"],
  enableReinitialize: true,
})(EditPageForm)
