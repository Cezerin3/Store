import { Paper } from "@material-ui/core"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC } from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import { messages } from "../../../../lib"
import { CustomToggle } from "../../../shared/form"
import style from "./style.module.sass"

interface props {
  handleSubmit
  pristine
  submitting
}

const AccountForm: FC<props> = (props: props) => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div className="gray-title" style={{ margin: "15px 0 15px 20px" }}>
        {messages.account}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "initial",
          width: "100%",
        }}
      >
        <Paper style={{ margin: "0px 20px" }} elevation={4}>
          <div style={{ padding: "10px 30px 30px 30px" }}>
            <Field
              component={TextField}
              fullWidth
              name="email"
              floatingLabelText={messages.email}
            />
            <Field
              component={TextField}
              fullWidth
              name="shop_url"
              floatingLabelText={messages.shopUrl}
            />
            <Field
              component={TextField}
              fullWidth
              name="admin_url"
              floatingLabelText={messages.adminUrl}
            />
            <Field
              component={CustomToggle}
              name="is_developer"
              label={messages.isDeveloper}
              style={{ paddingTop: 16, paddingBottom: 16 }}
            />
          </div>
          <div
            className="buttons-box"
            style={{ display: pristine ? "none" : "block" }}
          >
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
    </div>
  )
}

export default reduxForm({
  form: "WebStoreAccountForm",
  enableReinitialize: true,
})(AccountForm)
