import { Button, Divider, Paper } from "@material-ui/core"
import api from "lib/api"
import React from "react"
import { messages } from "../../../../lib"
import ThemeSettings from "../../../settings/themeSettings"
import style from "./style.module.sass"

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    opacity: 0,
  },
}

const Theme = props => {
  function onExportClick() {
    props.exportRequest()
    api.theme.export().then(({ satus, json }) => {
      props.exportReceive()
      if (json.file) {
        window.location = json.file
      } else {
        alert("Error: " + JSON.stringify(json))
      }
    })
  }

  function onImportFileChoose(e) {
    props.installRequest()
    const file = e.target.files[0]
    var formData = new FormData()
    formData.append("file", file)

    api.theme.install(formData)
  }

  const { exportInProcess, installInProcess } = props

  return (
    <>
      <Paper className="paper-box" elevation={4}>
        <div className={style.innerBox}>
          <div className="row between-xs middle-xs">
            <div className="col-xs-6">
              {messages.settings_themeExportDesciption}
            </div>
            <div className="col-xs-4" style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                disabled={exportInProcess || installInProcess}
                onClick={onExportClick.bind(this)}
              >
                {exportInProcess
                  ? messages.settings_themeExporting
                  : messages.settings_themeExport}
              </Button>
            </div>
          </div>

          <Divider
            style={{
              marginTop: 30,
              marginBottom: 30,
              marginLeft: -30,
              marginRight: -30,
            }}
          />

          <div className="row between-xs middle-xs">
            <div className="col-xs-6">
              {messages.settings_themeInstallDesciption}
            </div>
            <div className="col-xs-4" style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                disabled={installInProcess}
              >
                <>
                  {installInProcess
                    ? messages.settings_themeInstalling
                    : messages.settings_themeInstall}
                  <input
                    type="file"
                    onChange={onImportFileChoose.bind(this)}
                    disabled={installInProcess}
                    style={styles.exampleImageInput}
                  />
                </>
              </Button>
            </div>
          </div>
        </div>
      </Paper>

      <ThemeSettings />
    </>
  )
}

export default Theme
