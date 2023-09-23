import Chart from 'react-apexcharts'
import { IDbCompProps, refactorConfig } from '../type'
import DbCompDelete from './DbCompDelete'
import { useEffect, useState } from 'react'
import { IDBComponentConfig, dboardQueryLine } from '@/services/dashboard'
import { ApexOptions } from "apexcharts";

interface ISetting {
  options: ApexOptions
  series: ApexOptions['series']
}

const defaultSetting: ISetting = {
  options: {
    title: {
      text: 'Burndown chart',
      style: {
        fontWeight: 'normal'
      }
    },
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false
      },
    },
    xaxis: {
      categories: [],
    },
  },
  series: [{
    name: "Actual",
    data: [],
  },
  {
    name: "Ideal",
    data: []
  },
  ]
}

export const DbCompBurnDownChart = ({ id, config, title }: IDbCompProps) => {

  const [setting, setSetting] = useState(defaultSetting)

  useEffect(() => {
    const newConfig = refactorConfig(config)

    dboardQueryLine(newConfig as IDBComponentConfig).then(res => {
      const { status, data } = res.data
      if (status !== 200) {
        return
      }

      const updateSetting = {
        options: {
          ...defaultSetting.options,
          xaxis: {
            categories: data.dates,
          }
        },
        series: [{
          name: "Actual",
          data: data.actual,
        },
        {
          name: "Ideal",
          data: data.ideal
        },
        ]
      }
      setSetting(updateSetting)
    }).catch((err) => {
      console.log(err)
    })
  }, [config])

  return (

    <div className="col-span-2 mt-3 bg-white border rounded-md shadow-sm pt-3 relative">
      <DbCompDelete id={id} />
      <Chart
        options={setting.options}
        series={setting.series}
        height={300}
        type="line"
      />
    </div>

  )
}
