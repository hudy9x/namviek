'use client'

import { IDbCompProps, refactorConfig } from '../type'
import DbCompDelete from './DbCompDelete'
import { useEffect, useState } from 'react'
import { IDBComponentConfig, dboardQueryBurnChart } from '@/services/dashboard'
import { ApexOptions } from 'apexcharts'
import { DashboardComponentType } from '@prisma/client'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

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

    colors: ['#216fed', '#66c90e'],
    // dataLabels: {
    //   enabled: false
    // },
    chart: {
      id: 'basic-bar',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: [],
      tickAmount: 3
    },
    stroke: {
      curve: 'smooth'
    }
  },
  series: [
    {
      name: 'Actual',
      data: []
    },
    {
      name: 'Ideal',
      data: []
    }
  ]
}

export const DbCompBurnChart = ({ id, config, type, title }: IDbCompProps) => {
  const [setting, setSetting] = useState(defaultSetting)

  useEffect(() => {
    const newConfig = refactorConfig(config)

    dboardQueryBurnChart(
      newConfig as IDBComponentConfig,
      type as DashboardComponentType
    )
      .then(res => {
        const { status, data } = res.data
        if (status !== 200) {
          return
        }

        const updateSetting: ISetting = {
          options: {
            ...defaultSetting.options,
            xaxis: {
              categories: data.dates,
              tickAmount: 6,
              tickPlacement: 'between'
            },
            title: {
              ...defaultSetting.options.title,
              text: title
            }
          },
          series: [
            {
              name: 'Actual',
              data: data.actual
            },
            {
              name: 'Ideal',
              data: data.ideal
            }
          ]
        }
        setSetting(updateSetting)
      })
      .catch(err => {
        console.log(err)
      })
  }, [config, type])

  return (
    <div className="col-span-2 mt-3 bg-white border rounded-md shadow-sm pt-3 relative">
      <DbCompDelete id={id} />
      {typeof window !== 'undefined' && (
        <Chart
          options={setting.options}
          series={setting.series}
          height={300}
          type="line"
        />
      )}
    </div>
  )
}
