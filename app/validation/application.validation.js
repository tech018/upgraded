import * as yup from 'yup';
const application = yup.object().shape({
  plateNumber: yup
    .string()
    .required('Plate number is required')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      'Must be containts letters and numbers',
    )
    .min(6, 'Must be atleast 6 characters')
    .trim(),
});

export default {
  application,
};
