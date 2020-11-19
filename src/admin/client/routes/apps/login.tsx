import { Button, Paper, TextField } from "@material-ui/core"
import CezerinClient from "cezerin2-client"
import React, { useEffect, useState } from "react"
import { auth, messages } from "../../lib"

const LoginForm = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("webstore_email") || ""
  )
  const [isFetching, setIsFetching] = useState(false)
  const [emailIsSent, setEmailIsSent] = useState(false)
  const [error, setError] = useState(null)

  const handleKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setIsFetching(true)
    setEmailIsSent(false)
    setError(null)

    CezerinClient.authorizeInWebStore(
      email,
      window.location.origin + "/admin"
    ).then(({ status, json }) => {
      setIsFetching(false)
      setEmailIsSent(status === 200)
      setError(status !== 200 && json ? json.message : null)
    })
  }

  useEffect(() => {
    auth.checkTokenFromUrl()
  }, [])

  let response = null
  if (isFetching) {
    response = (
      <div className="loginSuccessResponse">{messages.messages_loading}</div>
    )
  } else if (emailIsSent) {
    response = (
      <div className="loginSuccessResponse">{messages.loginLinkSent}</div>
    )
  } else if (emailIsSent === false && error) {
    response = <div className="loginErrorResponse">{error}</div>
  }

  return (
    <div className="row col-full-height center-xs middle-xs">
      <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <Paper className="loginBox" elevation={4}>
          <div className="loginTitle">{messages.webstoreLoginTitle}</div>
          <div className="loginDescription">{messages.loginDescription}</div>
          <div className="loginInput">
            <TextField
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              onKeyPress={handleKeyPress}
              label={messages.email}
              fullWidth
              style={{ width: "100%" }}
              helperText={messages.email}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            disabled={isFetching || emailIsSent}
            onClick={handleSubmit}
          >
            {messages.loginButton}
          </Button>

          {response}
        </Paper>
      </div>
    </div>
  )
}

export default LoginForm
