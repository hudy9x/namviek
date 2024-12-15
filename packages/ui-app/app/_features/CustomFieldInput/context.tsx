import { createContext, useContext } from "react";

interface ICustomFieldInputContext {
  onChange: (value: string | string[]) => void
}

export const CustomFieldInputContext = createContext<ICustomFieldInputContext>({
  onChange: () => { console.log('1') }
})

export const useCustomFieldInputContext = () => {
  const context = useContext(CustomFieldInputContext)

  return context
}

