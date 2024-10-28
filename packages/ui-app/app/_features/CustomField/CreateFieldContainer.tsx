import { FieldType } from "@prisma/client"
import { GoNumber } from "react-icons/go"
import { HiMiniAtSymbol, HiOutlineArrowDownCircle, HiOutlineBars2, HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineLink, HiOutlineListBullet } from "react-icons/hi2"

export default function CreateFieldContainer() {
  const types = [
    { icon: <HiOutlineBars2 />, title: 'Text', type: FieldType.TEXT },
    { icon: <GoNumber />, title: 'Number', type: FieldType.NUMBER },
    { icon: <HiOutlineCalendar />, title: 'Date', type: FieldType.DATE },
    { icon: <HiOutlineArrowDownCircle />, title: 'Select', type: FieldType.SELECT },
    { icon: <HiOutlineListBullet />, title: 'Multi Select', type: FieldType.MULTISELECT },
    { icon: <HiOutlineCheckCircle />, title: 'Checkbox', type: FieldType.CHECKBOX },
    { icon: <HiOutlineLink />, title: 'Url', type: FieldType.URL },
    { icon: <HiMiniAtSymbol />, title: 'Email', type: FieldType.EMAIL },
  ]
  return <div>
    <h2>Create custom fields</h2>
    <div className="space-y-1">
      {types.map((t, index) => {
        return <div key={index} className="border rounded-sm px-2 py-1 text-sm cursor-pointer flex items-center gap-2">
          {t.icon}
          <span>
            {t.title}
          </span>
        </div>
      })}
    </div>
  </div>
}
