import { useState } from 'react';
import { useProjectStatusStore } from '../../store/status';

export default function StatusItem({ id }: { id: string }) {
  const { statuses } = useProjectStatusStore();
  const [visible, setVisible] = useState(false);

  const status = statuses.find(stt => stt.id === id);

  if (!status) return null;

  return (
    <div className="relative">
      <div
        className="w-4 h-4 rounded cursor-pointer"
        onClick={() => {
          setVisible(!visible);
        }}
        style={{ backgroundColor: status.color }}></div>
      <div className={`absolute top-5 left-0 z-20 bg-white rounded border ${visible ? '' : 'hidden'}`}>
        {statuses.map(stt => {
          return <div key={stt.id} className='px-2 py-1'>{stt.name}</div>;
        })}
      </div>
    </div>
  );
}
