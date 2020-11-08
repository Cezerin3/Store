import React, { FC, useEffect } from "react"
import Account from "./account"
import Developer from "./developer"
import style from "./style.module.sass"

interface props {
  account
  onAccountSubmit
  onDeveloperSubmit
  fetchData: Function
}

const WebStoreAccountDetails: FC<props> = (props: props) => {
  const { account, onAccountSubmit, onDeveloperSubmit, fetchData } = props

  useEffect(() => {
    fetchData()
  }, [])

  const developerData = account ? account.developer : null

  if (account) {
    return (
      <div className={style.detailsContainer + " scroll col-full-height"}>
        <Account initialValues={account} onSubmit={onAccountSubmit} />
        {account && account.is_developer === true && (
          <Developer
            initialValues={developerData}
            onSubmit={onDeveloperSubmit}
          />
        )}
      </div>
    )
  } else {
    return null
  }
}

export default WebStoreAccountDetails
