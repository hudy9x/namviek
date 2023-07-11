import { ListSetting } from './ListSetting';
import { ProjectStatus } from './ProjectStatus';

export const Setting = () => {
  return (
    <div className="flex mt-8">
      <ListSetting />
      <ProjectStatus />
    </div>
  );
};
