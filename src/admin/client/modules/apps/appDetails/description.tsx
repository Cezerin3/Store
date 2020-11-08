import { Paper } from "@material-ui/core"
import React, { FC } from "react"
import style from "./style.module.sass"

interface props {
  name: string
  description: string
  coverUrl: string
  developer?: { name: string }
  enabled?: boolean
}

const AppDescription: FC<props> = (props: props) => {
  const { name, description, coverUrl, developer } = props

  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <Paper className="paper-box" elevation={4}>
        <div className={style.innerBox}>
          <div className="row">
            <div className="col-xs-4">
              <img src={coverUrl} alt={name} className={style.cover} />
            </div>
            <div className="col-xs-8">
              <h1 className={style.title}>{name}</h1>
              <div className={style.developer}>{developer}</div>
              {/* {!enabled &&
              <RaisedButton label={messages.enable} primary={true} disabled={loadingEnableDisable} onClick={enableService} />
            }
            {enabled &&
              <RaisedButton label={messages.disable} disabled={loadingEnableDisable} onClick={disableService} />
            } */}
            </div>
          </div>
          <div
            className={style.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Paper>
    </div>
  )
}

export default AppDescription
