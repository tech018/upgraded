import {Box, Button, Icon, Text} from 'native-base';
import {useSelector} from 'react-redux';
import {paymentHelper} from '../../helpers/computations';
import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function ConfirmDetails({active, setActive}) {
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
  const navigation = useNavigation();

  const application = useSelector(state => state.application);
  const {applicationType, plateNumber, vehicleType} = application.applications;

  const handleGoBack = () => {
    if (active !== 0) return setActive(active - 1);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          onPress={() => handleGoBack()}
          as={MaterialIcons}
          name="arrow-back-ios"
          size={5}
          color="#fff"
        />
      ),
    });
  }, [navigation]);

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
        <Text fontSize={20}>
          You will Pay: &#x20B1;{paymentHelper(applicationType, vehicleType)}
        </Text>
      </Box>
      <Text p={15} textAlign="justify" mt={3}>
        Please review and confirm that all fields in the electronic gatepass are
        accurate before proceeding. Thank you.
      </Text>

      <Button
        // isLoading={loading}
        // isLoadingText="Activating account"
        // onPress={handleNext}
        bg="primary.900"
        // disabled={selected === '' ? true : false}
        size="lg"
        style={{
          borderRadius: 25,
          height: 45,
          marginTop: 30,
          marginLeft: 15,
          marginRight: 15,
        }}>
        Pay online
      </Button>
      <Button
        bg="amber.600"
        size="lg"
        style={{
          borderRadius: 25,
          height: 45,
          marginTop: 10,
          marginLeft: 15,
          marginRight: 15,
        }}>
        Pay on counter
      </Button>
      <Button
        bg="red.600"
        size="lg"
        style={{
          borderRadius: 25,
          height: 45,
          marginTop: 10,
          marginLeft: 15,
          marginRight: 15,
        }}>
        Cancel Application
      </Button>
    </Box>
  );
}
