import { FieldType } from "@prisma/client";
import CreateFieldText from "./CreateFieldText";
import { HiOutlineArrowDownCircle } from "react-icons/hi2";
import { useCustomFieldStore } from "./store";
import SubmitCustomFieldConfig from "./SubmitCustomFieldConfig";
import { types } from "./FormSelectType";
import CreateFieldNumber from "./CreateFieldNumber";
import CreateFieldDate from "./CreateFieldDate";
import CreateFieldSelect from "./CreateFieldSelect";
import CreateFieldPerson from "./CreateFieldPerson";

export default function CreateFieldFactory() {

  const { data, display, setDisplay } = useCustomFieldStore()

  const generateForm = () => {
    switch (data.type) {
      case FieldType.EMAIL:
      case FieldType.URL:
      case FieldType.TEXT:
      case FieldType.CHECKBOX:
      case FieldType.FILES:
        return <CreateFieldText />

      case FieldType.CREATED_BY:
      case FieldType.UPDATED_BY:
        return <CreateFieldText />

      case FieldType.UPDATED_AT:
      case FieldType.CREATED_AT:
        return <CreateFieldDate />

      case FieldType.NUMBER:
        return <CreateFieldNumber />

      case FieldType.PERSON:
        return <CreateFieldPerson />

      case FieldType.DATE:
        return <CreateFieldDate />


      case FieldType.SELECT:
      case FieldType.MULTISELECT:
        return <CreateFieldSelect />

      default:
        return null
    }

  }

  const selectedType = types.find(t => t.type === data.type)

  return <div className={`${display ? '' : 'hidden'}`}>
    <h2>Field configuration</h2>

    <div className="mt-4">
      <div
        onClick={() => {
          setDisplay(false)
        }}
        className="mb-3 relative border hover:bg-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm cursor-pointer flex items-center gap-3">

        {selectedType ? selectedType.icon : null}
        <span>
          {selectedType ? selectedType.title : null}
        </span>
        <HiOutlineArrowDownCircle className="absolute right-3 top-2 w-5 h-5 text-gray-700" />
      </div>
      {generateForm()}
    </div>
    <SubmitCustomFieldConfig />
  </div>

}
