'use client';

import { Form, Modal, Button, messageError } from '@shared/ui';
import { useFormik } from 'formik';
import { useState } from 'react';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { useParams } from 'next/navigation';
import { validateQuickAddProject } from '@shared/validation';
import { projectQuickAdd } from '../../services/project';
import { useProjectStore } from '../../store/project';

export default function ProjectAdd() {
  const params = useParams();
  const { addProject } = useProjectStore();
  const [visible, setVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: ''
    },
    onSubmit: values => {
      const { error, errorArr, data } = validateQuickAddProject(values);

      if (!params.orgID) {
        return messageError('Organization ID is not exist');
      }

      if (error) {
        console.log('error');
        formik.setErrors(errorArr);
        return;
      }

      setVisible(false);
      projectQuickAdd({
        ...values,
        ...{
          organizationId: params.orgID
        }
      }).then(res => {
        const { status, data } = res.data;
        console.log('done');
        if (status !== 200) {
          return;
        }

        console.log('add new project to store');
        addProject(data);
      });
    }
  });

  return (
    <>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Create new project"
        triggerBy={
          <div>
            <HiOutlinePlusSm className="section-icon" />
          </div>
        }
        content={
          <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <Form.Input
                title="Project name"
                required
                name="name"
                error={formik.errors.name}
                onChange={formik.handleChange}
                value={formik.values.name}
              />

              <Form.Textarea title="Desciption" name="desc" onChange={formik.handleChange} value={formik.values.desc} />

              <div className="flex justify-end">
                <Button type="submit" title="Create new" block primary />
              </div>
            </form>
          </>
        }
      />
    </>
  );
}
