import { FieldType } from "@prisma/client"
import { GoNumber } from "react-icons/go"
import { RxText } from "react-icons/rx"
import {
  HiMiniAtSymbol,
  HiOutlineArrowDownCircle,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineUser,
  HiOutlineDocument,
  HiOutlineUserPlus,
  HiOutlineUsers,
  HiOutlineCalendarDays,
  HiOutlineClock
} from "react-icons/hi2"
import { VscDebugDisconnect } from "react-icons/vsc"
export const typeIcons = {
  [FieldType.TEXT]: <RxText className="w-4 h-4" />,
  [FieldType.NUMBER]: <GoNumber className="w-4 h-4" />,
  [FieldType.DATE]: <HiOutlineCalendar className="w-4 h-4" />,
  [FieldType.PERSON]: <HiOutlineUser className="w-4 h-4" />,
  [FieldType.SELECT]: <HiOutlineArrowDownCircle className="w-4 h-4" />,
  [FieldType.MULTISELECT]: <HiOutlineListBullet className="w-4 h-4" />,
  [FieldType.CHECKBOX]: <HiOutlineCheckCircle className="w-4 h-4" />,
  [FieldType.FILES]: <HiOutlineDocument className="w-4 h-4" />,
  [FieldType.URL]: <HiOutlineLink className="w-4 h-4" />,
  [FieldType.EMAIL]: <HiMiniAtSymbol className="w-4 h-4" />,
  [FieldType.CONNECTOR]: <VscDebugDisconnect className="w-4 h-4" />,
  [FieldType.CREATED_BY]: <HiOutlineUserPlus className="w-4 h-4" />,
  [FieldType.CREATED_AT]: <HiOutlineClock className="w-4 h-4" />,
  [FieldType.UPDATED_BY]: <HiOutlineUsers className="w-4 h-4" />,
  [FieldType.UPDATED_AT]: <HiOutlineClock className="w-4 h-4" />
} 