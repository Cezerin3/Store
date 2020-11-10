import { Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import messages from "lib/text"
import { List, ListItem } from "material-ui/List"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"

interface props {
  importSettings
  onLoad: Function
}

const ImportSettings = (props: props) => {
  const { importSettings, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <>
      <Paper className="paper-box" elevation={4}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>
            <Link
              to="/admin/settings/import/googlespreadsheet"
              style={{ textDecoration: "none" }}
            >
              <ListItem
                rightIcon={<KeyboardArrowRight />}
                primaryText={
                  <div className="row">
                    <div className="col-xs-6">
                      {messages.settings_spreadsheet}
                    </div>
                  </div>
                }
              />
            </Link>
          </List>
        </div>
      </Paper>
    </>
  )
}

export default ImportSettings
