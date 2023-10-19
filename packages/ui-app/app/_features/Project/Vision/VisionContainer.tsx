import { HiOutlineViewBoards, HiOutlineViewList } from 'react-icons/hi'
import ProjectVisionList from './VisionList'
import { HiOutlineBars3, HiOutlineViewColumns } from 'react-icons/hi2'
import { Button, FormGroup } from '@shared/ui'
import { useState } from 'react'
import ListPreset from '@/components/ListPreset'
import VisionBoard from './VisionBoard'
import VisionListTask from './VisionListTask'
import { DragDropContext } from 'react-beautiful-dnd'

export default function ProjectVisionContainer() {
  const [view, setView] = useState('list')
  return (
    <div className="vision relative">
      <div
        className="flex px-1 divide-x"
        style={{ height: `calc(100vh - 83px)` }}>
        <div className="p-3">
          <VisionListTask />
        </div>
        <div className="p-3">
          <ProjectVisionList />
        </div>
      </div>

      {/* <header className="w-[700px] mx-auto mt-12 mb-2"> */}
      {/*   <div className="flex items-center justify-between gap-2"> */}
      {/*     <ListPreset */}
      {/*       value="this-month" */}
      {/*       options={[ */}
      {/*         { id: 'this-month', title: 'This month' }, */}
      {/*         { id: 'this-week', title: 'This week' }, */}
      {/*         { id: 'all', title: 'All time' } */}
      {/*       ]} */}
      {/*     /> */}
      {/**/}
      {/*     <FormGroup> */}
      {/*       <Button */}
      {/*         disabled={view === 'list'} */}
      {/*         onClick={() => setView('list')} */}
      {/*         leadingIcon={<HiOutlineBars3 />} */}
      {/*       /> */}
      {/*       <Button */}
      {/*         disabled={view === 'board'} */}
      {/*         onClick={() => setView('board')} */}
      {/*         leadingIcon={<HiOutlineViewColumns />} */}
      {/*       /> */}
      {/*     </FormGroup> */}
      {/*   </div> */}
      {/* </header> */}
      {/* {view === 'list' ? <ProjectVisionList /> : <VisionBoard />} */}
    </div>
  )
}
