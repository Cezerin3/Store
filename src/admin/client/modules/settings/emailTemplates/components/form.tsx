import { Paper } from "@material-ui/core"
import RaisedButton from "material-ui/RaisedButton"
import React from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import { messages } from "../../../../lib"
import style from "./style.module.sass"

class EmailTemplate extends React.Component {
  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    const { handleSubmit, pristine, submitting, initialValues } = this.props

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
            <div>
              <Field
                component={TextField}
                fullWidth
                name="subject"
                floatingLabelText={messages.settings_emailSubject}
              />
            </div>
            <div>
              <Field
                component={TextField}
                fullWidth
                name="body"
                multiLine
                floatingLabelText={messages.settings_emailBody}
              />
            </div>
          </div>
          <div className="buttons-box">
            <RaisedButton
              type="submit"
              label={messages.save}
              primary
              className={style.button}
              disabled={pristine || submitting}
            />
          </div>
        </Paper>
      </form>
    )
  }
}

export default reduxForm({ form: "EmailTemplate", enableReinitialize: true })(
  EmailTemplate
)
