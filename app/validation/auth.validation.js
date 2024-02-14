import * as yup from 'yup';
const register = yup.object().shape({
  password: yup.string().required('Password is required!').trim(),
  mobile: yup.string().required('Mobile number is required!').trim(),
  email: yup
    .string()
    .required('Email is required!')
    .email('Please enter a valid email')
    .trim(),
  agreePolicy: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

const activate = yup.object().shape({
  OTP: yup.number().required('OTP is required!'),
});

const recover = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email is required!'),
});

const login = yup.object().shape({
  password: yup.string().required('Password is required!').trim(),
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email is required!')
    .trim(),
});

const changePass = yup.object().shape({
  password: yup.string().required('Password is required!'),
  OTP: yup.string().required('OTP is required!'),
});

export default {
  changePass,
  login,
  activate,
  recover,
  register,
};
