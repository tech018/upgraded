import {Box, Button, Icon, Text, useToast} from 'native-base';
import {useSelector} from 'react-redux';
import {paymentHelper} from '../../helpers/computations';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {usePostCreateApplicationMutation} from '../../store/application.slice';
export default function ConfirmDetails({active, setActive}) {
  const [reqNewApp, {isError, isLoading, isSuccess, data, error}] =
    usePostCreateApplicationMutation();
  const [loading, setLoading] = useState(false);
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
  const toast = useToast();

  const {auth} = useSelector(state => ({auth: state.auth}));
  const application = useSelector(state => state.application);
  const {applicationType, plateNumber, vehicleType, image} =
    application.applications;

  const handleGoBack = () => {
    if (active !== 0) return setActive(active - 1);
  };

  useEffect(() => {
    if (isError) {
      setLoading(false);
      toast.show({
        render: () => {
          return (
            <Box bg="red.800" px="2" py="1" rounded="sm" mb={5}>
              <Text color="#ffffff"> {error.data?.message}</Text>
            </Box>
          );
        },
      });
    }
  }, [error, isError]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              <Text color="#ffffff"> {data.message}</Text>
            </Box>
          );
        },
      });
      navigation.navigate('DashBoardStack', {
        screen: data.redirect,
      });
    }
  }, [isSuccess, data]);

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

  const paycounter = () => {
    reqNewApp({
      token: auth.token,
      payload: {
        applicationType,
        email: auth.email,
        plateNumber,
        vehicleType,
        imageURI: image,
      },
    });
  };

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
      <Text p={15} textAlign="justify" mt={3}>
        Please review and confirm that all fields in the electronic gatepass are
        accurate before proceeding. Thank you.
      </Text>
      <Text fontSize={35} textAlign="center">
        You will Pay: &#x20B1;{paymentHelper(applicationType, vehicleType)}
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
        onPress={() => paycounter()}
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
