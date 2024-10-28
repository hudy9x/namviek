import { FieldType } from "@prisma/client"
import { GoNumber } from "react-icons/go"
import { HiMiniAtSymbol, HiOutlineArrowDownCircle, HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineLink, HiOutlineListBullet, HiOutlinePlus } from "react-icons/hi2"
import { RxText } from "react-icons/rx";

export default function CreateFieldContainer() {
  const types = [
    { icon: <RxText className="w-4 h-4" />, title: 'Text', type: FieldType.TEXT },
    { icon: <GoNumber className="w-4 h-4" />, title: 'Number', type: FieldType.NUMBER },
    { icon: <HiOutlineCalendar className="w-4 h-4" />, title: 'Date', type: FieldType.DATE },
    { icon: <HiOutlineArrowDownCircle className="w-4 h-4" />, title: 'Select', type: FieldType.SELECT },
    { icon: <HiOutlineListBullet className="w-4 h-4" />, title: 'Multi Select', type: FieldType.MULTISELECT },
    { icon: <HiOutlineCheckCircle className="w-4 h-4" />, title: 'Checkbox', type: FieldType.CHECKBOX },
    { icon: <HiOutlineLink className="w-4 h-4" />, title: 'Url', type: FieldType.URL },
    { icon: <HiMiniAtSymbol className="w-4 h-4" />, title: 'Email', type: FieldType.EMAIL },
  ]
  return <div>
    <h2>Create custom fields</h2>
    <div className="space-y-2 mt-4 ">
      {types.map((t, index) => {
        return <div key={index} className="border hover:bg-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm cursor-pointer flex items-center gap-3">
          {t.icon}
          <span>
            {t.title}
          </span>
        </div>
      })}
    </div>
  </div>
}
