import Dashboard from '../../screens/dashboard';
import AccountSettings from '../../screens/dashboard/account';
import Applications from '../../screens/dashboard/applications';

export const NAVIGATION_NAME = {
  DASHBOARD: 'DASHBOARDSCREEN',
  APPLICATIONS: 'APPLICATIONSCREEN',
  ACCOUNT: 'ACCOUNTSETTINGSCREEN',
};

const NAVIGATION_TITLE = {
  DASHBOARD: 'Dashboard',
  APPLICATIONS: 'Applications',
  ACCOUNT: 'Account',
};

const DashboardScreens = [
  {
    title: NAVIGATION_TITLE.DASHBOARD,
    name: NAVIGATION_NAME.DASHBOARD,
    component: Dashboard,
    icon: 'dashboard',
  },
  {
    title: NAVIGATION_TITLE.APPLICATIONS,
    name: NAVIGATION_NAME.APPLICATIONS,
    component: Applications,
    icon: 'commute',
  },
  {
    title: NAVIGATION_TITLE.ACCOUNT,
    name: NAVIGATION_NAME.ACCOUNT,
    component: AccountSettings,
    icon: 'account-circle',
  },
];

export default DashboardScreens;
