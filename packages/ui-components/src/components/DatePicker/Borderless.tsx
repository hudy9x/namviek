import DatePicker, { IDatePicker } from "./index";
import "./borderless.css"

export default function BorderlessDatepicker(props: IDatePicker ) {
  return <DatePicker className="datepicker-borderless" {...props} />
}
