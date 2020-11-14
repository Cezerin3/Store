import { Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import messages from "lib/text"
import { List, ListItem } from "material-ui/List"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"

const EmailSettings = props => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { emailSettings } = props
  const smtpHint =
    emailSettings && emailSettings.host && emailSettings.host.length > 0
      ? emailSettings.host
      : "none"

  return (
    <>
      <Paper className="paper-box" elevation={4}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>
            <Link
              to="/admin/settings/email/smtp"
              style={{ textDecoration: "none" }}
            >
              <ListItem
                rightIcon={<KeyboardArrowRight />}
                primaryText={
                  <div className="row">
                    <div className="col-xs-6">
                      {messages.settings_smtpSettings}
                    </div>
                    <div
                      className="col-xs-6"
                      style={{ color: "rgba(0, 0, 0, 0.4)" }}
                    >
                      {smtpHint}
                    </div>
                  </div>
                }
              />
            </Link>
          </List>
        </div>
      </Paper>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.settings_emailTemplates}
      </div>
      <Paper className="paper-box" elevation={4}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>
            <Link
              to="/admin/settings/email/templates/order_confirmation"
              style={{ textDecoration: "none" }}
            >
              <ListItem
                rightIcon={<KeyboardArrowRight />}
                primaryText={messages.settings_orderConfirmation}
              />
            </Link>
            <Link
              to="/admin/settings/email/templates/register_doi_en"
              style={{ textDecoration: "none" }}
            >
              <ListItem
                rightIcon={<KeyboardArrowRight />}
                primaryText={messages.settings_customerRegistration}
              />
            </Link>
            {/* <Link
								to="/admin/settings/email/templates/register_doi_de"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
									<KeyboardArrowRight />
									}
									primaryText={messages.settings_customerRegistration}
								/>
							</Link>
							<Link
								to="/admin/settings/email/templates/register_doi_ru"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
									<KeyboardArrowRight />
									}
									primaryText={messages.settings_customerRegistration}
								/>
							</Link> */}
            <Link
              to="/admin/settings/email/templates/forgot_password_en"
              style={{ textDecoration: "none" }}
            >
              <ListItem
                rightIcon={<KeyboardArrowRight />}
                primaryText={messages.settings_customerRecovery}
              />
            </Link>
            {/* <Link
								to="/admin/settings/email/templates/forgot_password_de"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
								<KeyboardArrowRight />
									}
									primaryText={messages.settings_customerRecovery}
								/>
							</Link>
							<Link
								to="/admin/settings/email/templates/forgot_password_ru"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
										<KeyboardArrowRight />
									}
									primaryText={messages.settings_customerRecovery}
								/>
							</Link> */}
          </List>
        </div>
      </Paper>
    </>
  )
}

export default EmailSettings
