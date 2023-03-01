import * as yup from 'yup';
export const roleValidation = yup.object().shape({
  roleName: yup
    .string()
    .required('Role name is required!')
    .typeError('Role name must be string'),
});
