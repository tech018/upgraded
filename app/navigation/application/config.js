import ApplicationEntry from '../../screens/application';
import AddNewApplication from '../../screens/application/addApplication';
import DriversLicense from '../../screens/application/scanner';

export const NAVIGATION_NAME = {
  ENTRY: 'APPLICATIONENTRY',
  DRIVERSLICENSE: 'DRIVERSLICENSESCREEN',
  ADDNEW: 'ADDNEWAPPLICATIONSCREEN',
};

const NAVIGATION_TITLE = {
  ENTRY: 'Application',
  DRIVERSLICENSE: "Driver's License",
  ADDNEW: 'Add New Application',
};

const ApplicationScreen = [
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
  {
    title: NAVIGATION_TITLE.ADDNEW,
    name: NAVIGATION_NAME.ADDNEW,
    component: AddNewApplication,
  },
];

export default ApplicationScreen;
