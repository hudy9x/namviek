import { MyWidgetContainer } from "./MyWidgetContainer"
import { MyWidgetCreate } from "./MyWidgetCreate"

export const MyWidget = () => {
  return (
    <div className="relative h-full w-full" >
      <MyWidgetCreate />
      <MyWidgetContainer />
    </div>
  )
}