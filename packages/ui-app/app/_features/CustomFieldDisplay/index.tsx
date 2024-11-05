import CreateField from "@/features/CustomField/CreateField";
import { fieldSv } from "@/services/field";
import { useProjectCustomFieldStore } from "@/store/customFields";
import { Field } from "@prisma/client";
import { messageSuccess } from "@shared/ui";
import { DragEvent, ReactNode, useRef, useState } from "react";

interface ICustomFieldDisplayProps {
  createBtn?: boolean
  sortable?: boolean
  children: (index: number, data: Field) => ReactNode
}

function CustomFieldSortable({ children, createBtn = false }: ICustomFieldDisplayProps) {

  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const swapPos = useProjectCustomFieldStore(state => state.swapPosition)
  const oldIndex = useRef(-1)
  const timeout = useRef(0)

  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const reorderFields = customFields.map(f => ({ id: f.id, order: f.order }))

  const updateSortable = () => {
    if (timeout.current) {
      console.log('cancelled')
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      fieldSv.sortable(reorderFields).then(res => {
        console.log(res)
        messageSuccess('Reorder success')
      })

    }, 500) as unknown as number;
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItem(index);
    const target = e.target as HTMLDivElement
    e.dataTransfer.effectAllowed = 'move';
    target.classList.add('opacity-50');
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    setDraggedItem(null);
    const target = e.target as HTMLDivElement
    target.classList.remove('opacity-50');

    updateSortable()
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (oldIndex.current === index) return
    oldIndex.current = index

    if (draggedItem === null || draggedItem === index) return;

    console.log(draggedItem, index)

    swapPos(draggedItem, index)
    setDraggedItem(index);
  };


  return <>{customFields.map((cf, index) => {
    const { width } = cf

    return <div
      key={cf.id}

      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragEnd={e => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e, index)}

      className="list-cell"
      style={{ width: width }}>
      {children(index, cf)}
    </div>
  })}
    <div className="list-cell">
      {createBtn ? <CreateField /> : null}
    </div>
  </>
}

function CustomFieldStatic({ children, createBtn }: ICustomFieldDisplayProps) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  return <>{customFields.map((cf, index) => {
    const { width } = cf

    return <div key={cf.id}
      className="list-cell"
      style={{ width: width }}>
      {children(index, cf)}
    </div>
  })}
    <div className="list-cell">
      {createBtn ? <CreateField /> : null}
    </div>
  </>
}

// export default function CustomFieldDisplay({ children, createBtn = false, sortable = false }: ICustomFieldDisplayProps) {
//
//   if (sortable) {
//     return <CustomFieldSortable children={children} createBtn={createBtn} />
//   }
//
//   return <CustomFieldStatic children={children} createBtn={createBtn} />
//
// }


function CustomFieldStaticCell({ children, width }: { children: ReactNode, width: number }) {
  return <div className="list-cell" style={{ width }}>
    {children}
  </div>
}

let draggedItem: number | null = null
let oldIndex: number = -1

function CustomFieldSortableCell({ children, width, index }: { children: ReactNode, width: number, index: number }) {

  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const swapPos = useProjectCustomFieldStore(state => state.swapPosition)
  // const oldIndex = useRef(-1)
  const timeout = useRef(0)

  // const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const reorderFields = customFields.map(f => ({ id: f.id, order: f.order }))

  const updateSortable = () => {
    if (timeout.current) {
      console.log('cancelled')
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      fieldSv.sortable(reorderFields).then(res => {
        console.log(res)
        messageSuccess('Reorder success')
      })

    }, 500) as unknown as number;
  }

  const setDraggedItem = (n: number | null) => {
    draggedItem = n
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    console.log('set dragged item', index)
    setDraggedItem(index);
    const target = e.target as HTMLDivElement
    e.dataTransfer.effectAllowed = 'move';
    target.classList.add('opacity-50');
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    setDraggedItem(null);
    oldIndex = -1
    const target = e.target as HTMLDivElement
    target.classList.remove('opacity-50');

    updateSortable()
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    console.log(draggedItem, index, oldIndex)
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (oldIndex === index) return
    oldIndex = index

    if (draggedItem === null || draggedItem === index) return;

    console.log(draggedItem, index)

    swapPos(draggedItem, index)
    setDraggedItem(index);
  };


  return <div
    draggable
    onDragStart={(e) => handleDragStart(e, index)}
    onDragEnd={e => handleDragEnd(e)}
    onDragOver={(e) => handleDragOver(e, index)}

    className="list-cell"
    style={{ width: width }}>
    {children}
  </div>
}

export default function CustomFieldDisplay({ children, createBtn = false, sortable = false }: ICustomFieldDisplayProps) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)

  const generateCustomFieldCell = (index: number, cf: Field) => {
    const { width } = cf
    if (!sortable)
      return <CustomFieldStaticCell key={cf.id} width={width}>
        {children(index, cf)}
      </CustomFieldStaticCell>

    return <CustomFieldSortableCell width={width} index={index}>
      {children(index, cf)}
    </CustomFieldSortableCell>
  }

  return <>{customFields.map((cf, index) => {
    return generateCustomFieldCell(index, cf)
  })}
    <div className="list-cell">
      {createBtn ? <CreateField /> : null}
    </div>
  </>

}
