import {Box, Text} from 'native-base';
import {useSelector} from 'react-redux';

export default function ConfirmDetails() {
  const AppType = {
    public: 'Public Driver',
    employee: 'Employee',
    student: 'Student',
    others: 'Others',
  };

  const vehType = {
    motor: 'MotorBike',
    tricycle: 'Tricycle',
    fourwheelmore: 'Four Wheels or more',
  };

  const application = useSelector(state => state.application);
  const {applicationType, plateNumber, vehicleType} = application.applications;
  return (
    <Box>
      <Text textAlign="center" mt={10} fontSize={25}>
        All Good?
      </Text>
      <Box
        borderColor="black"
        borderStyle="solid"
        borderWidth={1}
        borderRadius={5}
        padding={2}
        marginLeft={15}
        marginRight={15}
        marginTop={18}>
        <Text fontSize={20}>Application Type: {AppType[applicationType]}</Text>
        <Text fontSize={20}>Plate Number: {plateNumber}</Text>
        <Text fontSize={20}>Vehicle Type: {vehType[vehicleType]}</Text>
      </Box>
    </Box>
  );
}
