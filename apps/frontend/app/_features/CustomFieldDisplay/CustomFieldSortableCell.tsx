
import { fieldSv } from "@/services/field";
import { useProjectCustomFieldStore } from "@/store/customFields";
import { Field } from "@prisma/client";
import { messageSuccess } from "@ui-components";
import { DragEvent, ReactNode } from "react";

let draggedItem: number | null = null
let oldIndex = -1

function useUpdateHoverEffect() {

  const removeHoverEffect = () => {
    document.querySelectorAll('.list-cell-sortable-hover').forEach(elem => elem.classList.remove('list-cell-sortable-hover'))
  }

  const addHoverEffect = (target: HTMLDivElement) => {
    if (target.classList.contains('list-cell')) {
      target.classList.add('list-cell-sortable-hover')
    } else {
      target.closest('.list-cell')?.classList.add('list-cell-sortable-hover')
    }
  }

  return {
    removeHoverEffect,
    addHoverEffect
  }
}

function swapCustomFieldPosition(customFields: Field[], draggedItem: number, index: number) {
  console.log('customFields', customFields, draggedItem, index)
  const newItems = [...customFields];
  const draggedItemContent = newItems[draggedItem];

  newItems.splice(draggedItem, 1);
  newItems.splice(index, 0, draggedItemContent);

  return newItems.map((item, idx) => {
    return { ...item, order: idx + 1 }
  });
}

export default function CustomFieldSortableCell({ children, width, index }: { children: ReactNode, width: number, index: number }) {

  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const updateAllCustomFields = useProjectCustomFieldStore(state => state.addAllCustomField)
  const { addHoverEffect, removeHoverEffect } = useUpdateHoverEffect()

  const updateSortable = (customFields: Field[]) => {
    const reorderFields = customFields.map(f => ({ id: f.id, order: f.order }))
    fieldSv.sortable(reorderFields).then(res => {
      console.log(res)
      messageSuccess('Reorder success')
    })
  }

  const setDraggedItem = (n: number | null) => {
    draggedItem = n
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItem(index);
    const target = e.target as HTMLDivElement
    e.dataTransfer.effectAllowed = 'move';
    target.classList.add('opacity-50');
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    target.classList.remove('opacity-50');

    if (draggedItem) {
      console.log('end', draggedItem, oldIndex)
      removeHoverEffect()
      const updatedCustomfields = swapCustomFieldPosition(customFields, draggedItem, oldIndex)
      updateAllCustomFields(updatedCustomfields)
      updateSortable(updatedCustomfields)
    }

    oldIndex = -1
    setDraggedItem(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    const target = e.target as HTMLDivElement
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (oldIndex === index) return
    oldIndex = index

    if (draggedItem === null || draggedItem === index) return;

    removeHoverEffect()
    addHoverEffect(target)
    console.log('move', draggedItem, index, oldIndex, index === oldIndex)
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
