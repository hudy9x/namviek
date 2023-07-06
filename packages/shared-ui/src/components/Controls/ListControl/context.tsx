import { createContext, useContext } from "react"
import { ListContextProps } from "./type"

const ListContext = createContext<ListContextProps>({
  name: '',
  placeholder: '',
  onFormikChange: () => {console.log('onFormikChange')},
  visible: false,
  setVisible: () => {console.log('setVisible')},
  value: {id: '', title: ''},
  onChange: () => {console.log('onChange')},
  disabled: false,
  readOnly: false
})

export const ListProvider = ListContext.Provider
export const useListContext = () => {
  const context = useContext(ListContext)
  return context;
}

