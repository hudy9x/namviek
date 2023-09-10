'use client'

import { useProjectStatusStore } from '../../../../../store/status'
import { ListTaskStatus } from './ListTaskStatus'
// import List from 'react-virtualized/dist/commonjs/List'
//
// const list = new Array(10).fill(1).map((r, ind) => `title ${ind + 1}`)
// function rowRenderer({ key, index, isScrolling, isVisible, style }) {
//   return (
//     <div key={key} style={style}>
//       {list[index]}
//     </div>
//   )
// }

export default function ListMode() {
  const { statuses } = useProjectStatusStore()

  return (
    <div className="pb-[300px]">
      {/* <List */}
      {/*   width={300} */}
      {/*   height={300} */}
      {/*   rowCount={100} */}
      {/*   rowHeight={20} */}
      {/*   rowRenderer={rowRenderer} */}
      {/* /> */}
      {statuses.map(stt => {
        return (
          <ListTaskStatus
            key={stt.id}
            stt={stt}
            // statusLoading={statusLoading}
          />
        )
      })}
    </div>
  )
}
