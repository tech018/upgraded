import * as yup from 'yup';
const register = yup.object().shape({
  password: yup
    .string()
    .required('Password enter your desired password')
    .min(8, 'Must be atleast 8 characters')
    .trim(),
  mobile: yup
    .string()
    .required('Please enter your mobile number')
    .min(11, 'Must be atleast 11 characters')
    .trim(),
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email')
    .trim(),
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
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password must be at leats 8 characters')
    .trim(),
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Please enter your email address.')
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
