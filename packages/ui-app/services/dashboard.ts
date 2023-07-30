
import { DashboardComponent } from '@prisma/client';
import { httpGet, httpPost } from './_req';

interface IDBoardProps {
  projectId: string
  title: string
}

export const dboardCreate = ({
  projectId,
  title
}: IDBoardProps) => {
  return httpPost(`/api/dboard`, {
    projectId,
    title
  });
};

export const dboardGet = (projectId: string) => {
  return httpGet('/api/dboard', { params: projectId })
}

export const dboardComponentCreate = (data: Partial<Omit<DashboardComponent, 'id'>>) => {
  return httpPost('/api/dboard/component', data)
}
