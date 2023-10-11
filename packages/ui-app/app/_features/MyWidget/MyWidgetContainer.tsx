'use client'

import { useProjectWidget } from "@/store/widget";
import { useState } from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface IListWidget {
  title: string,
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  static: boolean
}

export const MyWidgetContainer = () => {
  const { widgets } = useProjectWidget()
  
  const onLayoutChange = (currentLayout: ReactGridLayout.Layout[], allLayout: ReactGridLayout.Layouts) => {
    console.log(currentLayout)
  }
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{lg: widgets}}
      onLayoutChange={onLayoutChange}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      {widgets.map((v, index) => (
        <div style={{ backgroundColor: '#ccc' }} key={v.i}>Widget-{index}</div>
      ))}
    </ResponsiveGridLayout>
  )
}