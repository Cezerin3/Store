import { Paper } from "@material-ui/core"
import React, { FC } from "react"
import apps from "../../../apps"
import AppDescription from "./description"
import style from "./style.module.sass"

interface props {
  match: { params: { appKey: string } }
}

const AppDetails: FC<props> = ({ match }: props) => {
  const { appKey } = match.params
  const app = apps.find(a => a.Description.key === appKey)
  const AppModule = app.App
  const appDescription = app.Description

  return (
    <div className={style.detailsContainer + " scroll col-full-height"}>
      <AppDescription {...appDescription} />
      <div style={{ maxWidth: 720, width: "100%" }}>
        <Paper className="paper-box" elevation={4}>
          <div className={style.innerBox}>
            <AppModule />
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default AppDetails
