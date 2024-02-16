import Login from '../../screens/auth/login';
import Register from '../../screens/auth/register';
import Reminder from '../../screens/auth/reminder';

const NAVIGATION_NAME = {
  LOGIN: 'AUTHLOGINSCREEN',
  REGISTER: 'AUTHREGISTERSCREEN',
  ACTIVATE: 'AUTHACTIVATESCREEN',
  RECOVER: 'AUTHRECOVERSCREEN',
  CHANGEPASS: 'AUTHCHANGEPASSWORDSCREEN',
  REMINDER: 'AUTHREMINDERSCREEN',
};

const NAVIGATION_TITLE = {
  LOGIN: 'Login',
  REGISTER: 'Register Account',
  RECOVER: 'Recover Access',
  REMINDER: 'Reminders',
};

const AuthScreens = [
  {
    title: NAVIGATION_TITLE.LOGIN,
    name: NAVIGATION_NAME.LOGIN,
    component: Login,
  },
  {
    title: NAVIGATION_TITLE.REGISTER,
    name: NAVIGATION_NAME.REGISTER,
    component: Register,
  },
  {
    title: NAVIGATION_TITLE.REMINDER,
    name: NAVIGATION_NAME.REMINDER,
    component: Reminder,
  },
];

export default AuthScreens;
