import { FieldType } from "@prisma/client"
import { GoNumber } from "react-icons/go"
import {
  HiMiniAtSymbol, HiOutlineArrowDownCircle, HiOutlineCalendar,
  HiOutlineCheckCircle, HiOutlineLink, HiOutlineListBullet, HiOutlineUser, HiOutlineDocument, HiOutlineUserPlus, HiOutlineUsers, HiOutlineCalendarDays, HiOutlineClock
} from "react-icons/hi2"
import { RxText } from "react-icons/rx";
import { useCustomFieldStore } from "./store";

export const types = [
  { icon: <RxText className="w-4 h-4" />, title: 'Text', type: FieldType.TEXT },
  { icon: <GoNumber className="w-4 h-4" />, title: 'Number', type: FieldType.NUMBER },
  { icon: <HiOutlineCalendar className="w-4 h-4" />, title: 'Date', type: FieldType.DATE },
  { icon: <HiOutlineUser className="w-4 h-4" />, title: 'Person', type: FieldType.PERSON },
  { icon: <HiOutlineArrowDownCircle className="w-4 h-4" />, title: 'Select', type: FieldType.SELECT },
  { icon: <HiOutlineListBullet className="w-4 h-4" />, title: 'Multi Select', type: FieldType.MULTISELECT },
  { icon: <HiOutlineCheckCircle className="w-4 h-4" />, title: 'Checkbox', type: FieldType.CHECKBOX },
  { icon: <HiOutlineDocument className="w-4 h-4" />, title: 'File', type: FieldType.FILES },
  { icon: <HiOutlineLink className="w-4 h-4" />, title: 'Url', type: FieldType.URL },
  { icon: <HiMiniAtSymbol className="w-4 h-4" />, title: 'Email', type: FieldType.EMAIL },

  { icon: <HiOutlineUserPlus className="w-4 h-4" />, title: 'Created By', type: FieldType.CREATED_BY },
  { icon: <HiOutlineClock className="w-4 h-4" />, title: 'Created At', type: FieldType.CREATED_AT },
  { icon: <HiOutlineUsers className="w-4 h-4" />, title: 'Updated By', type: FieldType.UPDATED_BY },
  { icon: <HiOutlineClock className="w-4 h-4" />, title: 'Updated At', type: FieldType.UPDATED_AT },
]
export default function FormSelectType() {
  const { setType, display } = useCustomFieldStore()

  return <div className={display ? 'hidden' : ''}>
    <h2>Create custom fields</h2>
    <div className="space-y-2 mt-4 ">

      {types.map((t, index) => {
        return <div key={index}
          onClick={() => {
            setType(t.type)
          }}
          className="relative border hover:bg-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm cursor-pointer flex items-center gap-3">
          {t.icon}
          <span>
            {t.title}
          </span>

        </div>
      })}

    </div>
  </div>
}
