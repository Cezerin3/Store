import { Button, Paper } from "@material-ui/core"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React from "react"
import { Field, FieldArray, reduxForm } from "redux-form"
import { messages } from "../../../../../lib"
import style from "./style.module.sass"

const AttributesGrid = ({ fields }) => (
  <>
    <div className="row row--no-gutter middle-xs">
      <div className={"col-xs-5 col--no-gutter " + style.head}>
        {messages.attributeName}
      </div>
      <div className={"col-xs-7 col--no-gutter " + style.head}>
        {messages.attributeValue}
      </div>
    </div>

    {fields.map((field, index) => {
      const fieldName = `${field}.name`
      const fieldValue = `${field}.value`
      return (
        <div
          className="row row--no-gutter middle-xs"
          key={index}
          style={{ borderBottom: "1px solid rgb(224, 224, 224)" }}
        >
          <div className="col-xs-5 col--no-gutter">
            <Field
              component="input"
              type="text"
              className={style.input}
              name={fieldName}
              placeholder={messages.attributeName}
            />
          </div>
          <div className="col-xs-6 col--no-gutter">
            <Field
              component="input"
              type="text"
              className={style.input}
              name={fieldValue}
              placeholder={messages.attributeValue}
            />
          </div>
          <div className="col-xs-1 col--no-gutter">
            <IconButton
              title={messages.actions_delete}
              onClick={() => fields.remove(index)}
              tabIndex={-1}
            >
              <FontIcon
                color="#a1a1a1"
                className="material-icons"
                data-index={index}
              >
                delete
              </FontIcon>
            </IconButton>
          </div>
        </div>
      )
    })}

    <div style={{ margin: 30 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => fields.push({})}
      >
        {messages.addAttribute}
      </Button>
    </div>
  </>
)

interface props {
  handleSubmit: Function
  pristine: boolean
  reset: Function
  submitting: boolean
}

const ProductAttributesForm = (props: props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={() => handleSubmit}>
      <Paper className="paper-box" elevation={4}>
        <FieldArray name="attributes" component={AttributesGrid} />
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
}

export default reduxForm({
  form: "ProductAttributesForm",
  enableReinitialize: true,
})(ProductAttributesForm)
