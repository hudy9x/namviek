import { ReactNode, useRef } from 'react';
import { useListContext } from './context';
import ListIcon, { XIcon } from './ListIcon';

interface ListButtonProps {
  children: ReactNode | string;
}
export default function ListButton({ children }: ListButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { visible, multiple, setVisible, onChange, onMultiChange, name, onFormikChange, placeholder } = useListContext();

  const child = () => {
    if (multiple && Array.isArray(children) && !children.length) {
      return placeholder ? (
        <span className="text-gray-400">{placeholder}</span>
      ) : (
        <span className="text-transparent">Option</span>
      );
    }

    return children ? (
      children
    ) : placeholder ? (
      <span className="text-gray-400">{placeholder}</span>
    ) : (
      <span className="text-transparent">Option</span>
    );
  };

  return (
    <div className="select-button form-input group" ref={buttonRef} tabIndex={0} onClick={() => setVisible(!visible)}>
      {multiple ? <div className="flex flex-wrap gap-2 pr-6 selected-item-container">{child()}</div> : child()}
      <div className="trailing-icon group-hover:text-gray-500">
        {children ? (
          <XIcon
            onClick={ev => {
              ev.stopPropagation();
              setVisible(false);
              onChange && onChange({ title: '', id: '' });
              onMultiChange && onMultiChange([]);
              name && onFormikChange && onFormikChange(name, { title: '', id: '' });
            }}
          />
        ) : null}
        <ListIcon />
      </div>
    </div>
  );
}
