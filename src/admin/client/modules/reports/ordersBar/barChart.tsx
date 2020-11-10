import { Paper } from "@material-ui/core"
import React from "react"
import { Bar } from "react-chartjs-2"
import style from "./style.module.sass"

interface props {
  data?: any
  title?: string
  subTitle?: string
  legendDisplay?: boolean
}

const BarChart = (props: props) => {
  const { data, title, subTitle, legendDisplay = false } = props
  return (
    <div className="row row--no-gutter">
      <div className="col--no-gutter col-xs-12">
        <Paper className="paper-box" elevation={4}>
          <div className={style.title}>{title && title}</div>
          <div className={style.subTitle}>{subTitle && subTitle}</div>
          <div style={{ padding: 30 }}>
            {data ? (
              <Bar
                data={data}
                width={100}
                height={200}
                options={{
                  legend: {
                    display: legendDisplay,
                  },
                  scales: {
                    xAxes: [
                      {
                        stacked: true,
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          display: true,
                          fontColor: "rgba(0,0,0,0.3)",
                          padding: 0,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        stacked: true,
                        gridLines: {
                          display: true,
                          drawBorder: false,
                          color: "rgba(0,0,0,0.08)",
                        },
                        ticks: {
                          maxTicksLimit: 4,
                          display: true,
                          padding: 10,
                          fontColor: "rgba(0,0,0,0.3)",
                        },
                      },
                    ],
                  },
                }}
              />
            ) : (
              <p>Data is not found in props!</p>
            )}
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default BarChart
