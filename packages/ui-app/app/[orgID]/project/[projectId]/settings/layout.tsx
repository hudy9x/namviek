import { ListSetting } from './ListSetting';
import { ProjectStatus } from './status/index';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Setting = () => {
  return (
    <div className="flex mt-8">
      <ListSetting />
      <DndProvider backend={HTML5Backend}>
        <ProjectStatus />
      </DndProvider>
    </div>
  );
};
