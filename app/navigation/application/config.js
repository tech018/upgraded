import ApplicationEntry from '../../screens/application';
import DriversLicense from '../../screens/application/scanner';

export const NAVIGATION_NAME = {
  ENTRY: 'APPLICATIONENTRY',
  DRIVERSLICENSE: 'DRIVERSLICENSESCREEN',
};

const NAVIGATION_TITLE = {
  ENTRY: 'Application',
  DRIVERSLICENSE: "Driver's License",
};

const AuthScreens = [
  {
    title: NAVIGATION_TITLE.ENTRY,
    name: NAVIGATION_NAME.ENTRY,
    component: ApplicationEntry,
  },
  {
    title: NAVIGATION_TITLE.DRIVERSLICENSE,
    name: NAVIGATION_NAME.DRIVERSLICENSE,
    component: DriversLicense,
  },
];

export default AuthScreens;
