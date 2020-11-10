import api from "lib/api"
import messages from "lib/text"
import moment from "moment"
import React, { FC, useEffect, useState } from "react"
import BarChart from "./barChart"
import * as utils from "./utils"

interface reportData {
  labels: any
  datasets: {
    label: any
    data: any
    backgroundColor: string
    hoverBackgroundColor: any
  }[]
}

const OrdersBar: FC = () => {
  const [ordersData, setOrdersData] = useState<reportData>(null)
  const [salesData, setSalesData] = useState<reportData>(null)

  const fetchData = async () => {
    const filter = {
      draft: false,
      cancelled: false,
      date_placed_min: moment()
        .subtract(1, "months")
        .hour(0)
        .minute(0)
        .second(0)
        .toISOString(),
    }
    try {
      const { json } = await api.orders.list(filter)
      const reportData = utils.getReportDataFromOrders(json)
      const getOrdersData = utils.getOrdersDataFromReportData(reportData)
      const getSalesData = utils.getSalesDataFromReportData(reportData)
      setOrdersData(getOrdersData)
      setSalesData(getSalesData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <BarChart
        data={ordersData}
        legendDisplay
        title={messages.drawer_orders}
      />
      <BarChart
        data={salesData}
        legendDisplay={false}
        title={messages.salesReport}
      />
    </>
  )
}

export default OrdersBar
