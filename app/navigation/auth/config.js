import Login from '../../screens/auth/login';

const NAVIGATION_NAME = {
  LOGIN: 'AUTHLOGINSCREEN',
  REGISTER: 'AUTHREGISTERSCREEN',
  ACTIVATE: 'AUTHACTIVATESCREEN',
  RECOVER: 'AUTHRECOVERSCREEN',
  CHANGEPASS: 'AUTHCHANGEPASSWORDSCREEN',
};

const NAVIGATION_TITLE = {
  LOGIN: 'Login',
  REGISTER: 'Register Account',
  RECOVER: 'Recover Access',
};

const AuthScreens = [
  {
    title: NAVIGATION_TITLE.LOGIN,
    name: NAVIGATION_NAME.LOGIN,
    component: Login,
  },
];

export default AuthScreens;
