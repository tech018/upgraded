import {Box, Center} from 'native-base';
import AddApplicationForm from '../../modules/forms/addApplication.form';
import {useState} from 'react';
import ApplicationTypeForm from '../../modules/forms/applicationType.form';
import AddVehicleForm from '../../modules/forms/addVehicle.form';
import ConfirmDetails from '../../modules/forms/confirmDetails';

function SwitchScreen(type, setActive) {
  switch (type) {
    case 0:
      return <AddApplicationForm active={type} setActive={setActive} />;
    case 1:
      return <ApplicationTypeForm active={type} setActive={setActive} />;
    case 2:
      return <AddVehicleForm active={type} setActive={setActive} />;
    case 3:
      return <ConfirmDetails active={type} setActive={setActive} />;
  }
}

export default function AddNewApplication() {
  const [active, setActive] = useState(0);
  return (
    <Box>
      <Center>{SwitchScreen(active, setActive)}</Center>
    </Box>
  );
}
