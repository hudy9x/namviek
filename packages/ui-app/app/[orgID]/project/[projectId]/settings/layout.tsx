import { ListSetting } from './ListSetting';
<<<<<<< HEAD
import { ProjectStatus } from './status/index';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
=======
import { ProjectStatus } from './ProjectStatus';
>>>>>>> main

export const Setting = () => {
  return (
    <div className="flex mt-8">
      <ListSetting />
<<<<<<< HEAD
      <DndProvider backend={HTML5Backend}>
        <ProjectStatus />
      </DndProvider>
=======
      <ProjectStatus />
>>>>>>> main
    </div>
  );
};
