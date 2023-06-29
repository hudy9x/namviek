import { createContext, useContext } from "react"
import { ListContextProps } from "./type"

const ListContext = createContext<ListContextProps>({
  name: '',
  placeholder: '',
  onFormikChange: () => {},
  visible: false,
  setVisible: () => {},
  value: {id: '', title: ''},
  onChange: () => {},
  disabled: false,
  readOnly: false
})

export const ListProvider = ListContext.Provider
export const useListContext = () => {
  const context = useContext(ListContext)
  return context;
}

