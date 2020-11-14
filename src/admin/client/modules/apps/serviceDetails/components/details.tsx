import React, { FC, useEffect, useState } from "react"
import ServiceActions from "./actions"
import ServiceDescription from "./description"
import ServiceLogs from "./logs"
import ServiceSettings from "./settings"
import style from "./style.module.sass"

interface props {
  serviceId: string
  service
  serviceSettings
  serviceLogs
  loadingEnableDisable
  enableService
  disableService
  updateSettings
  fetchServiceLogs
  fetchData: Function
}

const ServiceDetails: FC<props> = (props: props) => {
  const [timer, setTimer] = useState(null)

  const {
    serviceId,
    service,
    serviceSettings,
    serviceLogs,
    loadingEnableDisable,
    enableService,
    disableService,
    updateSettings,
    fetchServiceLogs,
    fetchData,
  } = props

  useEffect(() => {
    fetchData()

    // refresh logs every 5 sec
    const getTimer = setInterval(() => {
      const { service, fetchServiceLogs } = props
      if (service && service.enabled) {
        fetchServiceLogs()
      }
    }, 5000)

    setTimer(getTimer)
  }, [])

  useEffect(() => {
    return () => clearInterval(timer)
  }, [])

  let actions = null
  const serviceError = serviceSettings && serviceSettings.error === true
  if (
    service &&
    service.actions &&
    Array.isArray(service.actions) &&
    service.actions.length > 0
  ) {
    actions = service.actions
  }

  return (
    <div className={style.detailsContainer + " scroll col-full-height"}>
      <ServiceDescription
        service={service}
        loadingEnableDisable={loadingEnableDisable}
        enableService={enableService}
        disableService={disableService}
      />
      {serviceError && (
        <div style={{ color: "#FC3246", fontSize: "24px", margin: "30px" }}>
          Service error
        </div>
      )}
      {service && service.enabled && serviceSettings && !serviceError && (
        <ServiceSettings
          initialValues={serviceSettings}
          onSubmit={updateSettings}
        />
      )}
      {service && service.enabled && !serviceError && (
        <ServiceActions
          actions={actions}
          serviceId={serviceId}
          fetchServiceLogs={fetchServiceLogs}
        />
      )}
      {service && service.enabled && serviceLogs && serviceLogs.length > 0 && (
        <ServiceLogs logs={serviceLogs} />
      )}
    </div>
  )
}

export default ServiceDetails
