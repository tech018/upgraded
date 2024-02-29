import Activate from '../../screens/auth/activate';
import ChangePassword from '../../screens/auth/changepass';
import Login from '../../screens/auth/login';
import Recover from '../../screens/auth/recover';
import Register from '../../screens/auth/register';
import Reminder from '../../screens/auth/reminder';

export const NAVIGATION_NAME = {
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
  ACTIVATE: 'Activate Account',
  CHANGEPASS: 'Change Password',
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
  {
    title: NAVIGATION_TITLE.ACTIVATE,
    name: NAVIGATION_NAME.ACTIVATE,
    component: Activate,
  },
  {
    title: NAVIGATION_TITLE.RECOVER,
    name: NAVIGATION_NAME.RECOVER,
    component: Recover,
  },
  {
    title: NAVIGATION_TITLE.CHANGEPASS,
    name: NAVIGATION_NAME.CHANGEPASS,
    component: ChangePassword,
  },
];

export default AuthScreens;
