import {Box, Button, Center, Text, VStack, useToast} from 'native-base';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Input from '../../components/input';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import authValidation from '../../validation/auth.validation';
import {useDispatch, useSelector} from 'react-redux';
import {uotp} from '../../store/auth.slice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {usePutChangePassMutation} from '../../store/auth.slice';
import {useNavigation} from '@react-navigation/native';

function OTPForm({setActive, active, dispatch, updateotp, error}) {
  const {handleSubmit, control, setError} = useForm({
    resolver: yupResolver(authValidation.activate),
    defaultValues: {
      otp: 0,
    },
  });

  console.log('err', error);

  useEffect(() => {
    if (error?.status === 401) {
      setError('otp', {type: 'custom', message: error.data.message});
    }
  }, [error, setError]);

  const onSubmit = data => {
    dispatch(updateotp(data.otp));
    setActive(active + 1);
  };
  return (
    <Box flex={2} marginLeft={15} marginRight={15}>
      <Box mb={5}>
        <Text style={styles.textOtp} mb={2}>
          Please enter your otp
        </Text>
        <Input variant="otp-input" control={control} maxlength={6} name="otp" />
      </Box>
      <Button
        onPress={handleSubmit(onSubmit)}
        bg="primary.900"
        size="lg"
        style={{borderRadius: 25, height: 45, marginTop: 18}}>
        Next
      </Button>
    </Box>
  );
}

function Password({auth, passRequest, loading}) {
  const {handleSubmit, control, setError} = useForm({
    resolver: yupResolver(authValidation.changePass),
    defaultValues: {
      newpassword: '',
      confirmpassword: '',
    },
  });

  const onSubmit = data => {
    passRequest({
      email: auth.changepass.email,
      password: data.newpassword,
      otp: auth.changepass.otp,
    });
  };

  return (
    <Box flex={2} marginLeft={15} marginRight={15}>
      <Text style={styles.textPass} mb={2}>
        Please enter your new password
      </Text>
      <Box>
        <Input
          placeholder="New Password"
          passwordVariant="rounded"
          variant="secure-input"
          name="newpassword"
          control={control}
          iconsize={5}
          icon={<MaterialIcons name="lock" size={24} color="green" />}
        />
      </Box>
      <Box mt={5} mb={2}>
        <Input
          placeholder="Confirm Password"
          passwordVariant="rounded"
          variant="secure-input"
          name="confirmpassword"
          control={control}
          iconsize={5}
          icon={<MaterialIcons name="lock" size={24} color="green" />}
        />
      </Box>

      <Button
        isLoading={loading}
        isLoadingText="Changing password.."
        onPress={handleSubmit(onSubmit)}
        bg="primary.900"
        size="lg"
        style={{borderRadius: 25, height: 45, marginTop: 18}}>
        Change Password
      </Button>
    </Box>
  );
}

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [reqChangePass, {data, isError, isLoading, isSuccess, error}] =
    usePutChangePassMutation();
  const auth = useSelector(state => state.auth);
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (isError) {
      setLoading(false);

      if (error.status === 401) {
        setActive(error.data.authCode);
      }
    }
  }, [isError, error, setActive]);

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
      navigation.navigate('AuthStack', {screen: data.redirect});
    }
  }, [isSuccess, data]);

  return (
    <VStack flex={1}>
      <Center px="5" flex={1} gap={2} flexDir="row">
        {[1, 2].map(item => (
          <Box
            key={item}
            style={
              active === item ? styles.stepperActive : styles.stepperInActive
            }
          />
        ))}
      </Center>
      {active === 1 ? (
        <OTPForm
          dispatch={dispatch}
          updateotp={uotp}
          setActive={setActive}
          active={active}
          error={error}
        />
      ) : (
        <Password auth={auth} loading={loading} passRequest={reqChangePass} />
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  stepperActive: {
    borderBottomWidth: 4,
    borderBottomColor: '#02851f',
    width: 50,
  },
  stepperInActive: {
    borderBottomWidth: 4,
    borderBottomColor: 'black',

    width: 50,
  },
  textOtp: {
    fontSize: 18,
    fontWeight: '600',
  },
  textPass: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
});
