import { Button, DatePicker, Form } from '@shared/ui';
import MemberPicker from '../../../_components/MemberPicker';
import PrioritySelect from '../../../_components/PrioritySelect';
import { TaskPriority } from '@prisma/client';
import { useFormik } from 'formik';
import { validateTask } from '@shared/validation';
import { useParams } from 'next/navigation';
import { taskAdd } from '../../../../services/task';

export default function TaskForm() {
  const params = useParams()
  const formik = useFormik({
    initialValues: {
      title: '',
      assigneeIds: 'NONE',
      priority: TaskPriority.LOW,
      dueDate: new Date(),
      desc: '<p>Tell me what this task about 🤡</p>'
    },
    onSubmit: values => {
      // const mergedValues = { ...values, projectId: params.projectID }
      // console.log(mergedValues)
      // const { errorArr, data } = validateTask(values)
      // console.log(values)
      // console.log(errorArr, data);
      //
      console.log(values)

      taskAdd({ ...values, ...{ assigneeIds: [values.assigneeIds], projectId: params.projectId } }).then(res => {
        console.log(res)
      })
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
          console.log(val);
          formik.setFieldValue('assigneeIds', val)
        }}
      />
      {/* <MemberPicker */}
      {/*   title="Reviewer" */}
      {/*   value={formik.values.reviewer} */}
      {/*   onChange={val => { */}
      {/*     formik.setFieldValue('reviewer', val) */}
      {/*   }} */}
      {/* /> */}
      <PrioritySelect
        title="Priority"
        value={formik.values.priority}
        onChange={val => {
          formik.setFieldValue('priority', val)
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

      <Button type="submit" title="Submit now" primary block />
    </form>
  );
}
