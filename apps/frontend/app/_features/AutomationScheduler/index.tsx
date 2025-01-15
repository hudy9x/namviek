import { useState } from 'react'
import AutomateSchedulerCreate from './AutomateSchedulerCreate'
import AutomateSchedulerList from './AutomateSchedulerList'
import './style.css'
export default function AutomationScheduler() {
  const [visible, setVisible] = useState(false)
  const openCreateForm = () => {
    setVisible(true)
  }
  const backToList = () => {
    setVisible(false)
  }
  return <div className='box'>
    {!visible ? <AutomateSchedulerList openCreateForm={openCreateForm} /> : null}
    {visible ? <AutomateSchedulerCreate backToList={backToList} /> : null}
  </div>
}
