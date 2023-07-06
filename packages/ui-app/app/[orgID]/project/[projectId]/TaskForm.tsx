import { Button, DatePicker, Form, messageSuccess } from '@shared/ui';
import MemberPicker from '../../../_components/MemberPicker';
import PrioritySelect from '../../../_components/PrioritySelect';
import { TaskPriority } from '@prisma/client';
import { useFormik } from 'formik';
import { validateTask } from '@shared/validation';
import { useParams } from 'next/navigation';
import { taskAdd } from '../../../../services/task';
import { useState } from 'react';

const defaultFormikValues = {
  title: '',
  assigneeIds: [],
  priority: TaskPriority.LOW,
  dueDate: new Date(),
  desc: '<p>Tell me what this task about 🤡</p>'
};

export default function TaskForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const formik = useFormik({
    initialValues: defaultFormikValues,
    onSubmit: values => {
      if (loading) return;
      console.log('loading', loading);

      setLoading(true);
      const mergedValues = { ...values, projectId: params.projectId };
      console.log(mergedValues);

      const { error, errorArr, data } = validateTask(mergedValues);
      // console.log(values)
      // console.log(errorArr, data);
      if (error) {
        setLoading(false);
        console.log(errorArr);
        return;
      }
      console.log(data);

      taskAdd({ ...values, ...{ projectId: params.projectId } })
        .then(res => {
          const { data, status } = res.data;
          if (status !== 200) return;

          messageSuccess('Create new task successfully');
          onSuccess();
          formik.resetForm();

          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
      <Form.Input
        title="Task name"
        value={formik.values.title}
        onChange={e => {
          formik.setFieldValue('title', e.target.value);
        }}
        placeholder="Enter your task name here !"
      />
      <MemberPicker
        title="Assignees"
        value={formik.values.assigneeIds}
        onChange={val => {
          console.log('assignee:', val);
          formik.setFieldValue('assigneeIds', val);
        }}
      />
      <PrioritySelect
        title="Priority"
        value={formik.values.priority}
        onChange={val => {
          formik.setFieldValue('priority', val);
          console.log('alo', val);
        }}
      />
      <DatePicker
        title="Due date"
        value={formik.values.dueDate}
        onChange={d => {
          formik.setFieldValue('dueDate', d);
        }}
      />
      <Form.TextEditor
        title="Description"
        value={formik.values.desc}
        onChange={v => {
          formik.setFieldValue('desc', v);
        }}
      />

      <Button type="submit" loading={loading} title="Create new task" primary block />
    </form>
  );
}
