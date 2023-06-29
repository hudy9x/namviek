'use client';

import { Button, Form, messageError, messageSuccess } from '@shared/ui';
import { useFormik } from 'formik';
import { orgCreate } from '../../services/organization';

export default function CreateOrganization() {
  const formik = useFormik({
    initialValues: {
      name: '',
      desc: ''
    },
    onSubmit: values => {
      orgCreate(values).then(res => {
        console.log(res);
      });
      // addOrganization({
      // 	name: values.name
      // }).then(res => {
      // 	console.log('success')
      // }).catch(err => {
      // 	messageError('create error')
      // 	console.log(err)
      // })
    }
  });

  const registerForm = (name: keyof typeof formik.values, handler: typeof formik) => {
    return {
      name,
      error: handler.errors[name],
      value: handler.values[name],
      onChange: handler.handleChange
    };
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="org">
        <div className="org-setup">
          {/* <section className="setup-step mb-4"><span>Step 1/</span>6</section> */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            🖖 Hey,
            <br /> Welcome to Kampuni
          </h2>
          <p className="text-sm text-gray-400">
            Tell us more about your organization so we can provide personalized experience tailored to your needs and preferences
          </p>

          <div className="org-form mt-4 space-y-4">
            <div className="flex items-center gap-4">
              <img
                className="h-[50px] w-[50px] rounded-md border"
                src={'https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png'}
              />
              <div>
                <Button title="Upload image" size="sm" />
                <p className="text-gray-400 text-xs mt-1">.png, .jpeg files up to 4mb. Recommended size is 256x256</p>
              </div>
            </div>
            <Form.Input title="Organization name" {...registerForm('name', formik)} />
            <Form.Textarea title="Description" {...registerForm('desc', formik)} />
            <div>
              <Button type="submit" title="Save it" primary />{' '}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
