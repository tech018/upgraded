import {
  VStack,
  Button,
  Link,
  HStack,
  Text,
  Icon,
  useToast,
  Box,
} from 'native-base';
import {useForm} from 'react-hook-form';
import converter from '../../helpers/converter';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';

import authValidation from '../../validation/auth.validation';
import Input from '../../components/input/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {ucredentials, usePostLoginUserMutation} from '../../store/auth.slice';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';

export default function LoginForm() {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [reqLogin, {data, isError, isLoading, isSuccess, error}] =
    usePostLoginUserMutation();

  const [loading, setLoading] = useState(false);

  const {handleSubmit, control} = useForm({
    resolver: yupResolver(authValidation.login),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isError) {
      setLoading(false);
      console.log('error', error);
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
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      dispatch(
        ucredentials({
          email: data.email,
          token: data.token,
        }),
      );
      navigation.navigate('DashBoardStack', {screen: data.redirect});
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, [isLoading]);

  const onSubmit = data => {
    reqLogin(data);
    if (Platform.OS === 'ios') {
      reqLogin({
        email: converter.lowerCaseFirstLetter(data.email),
        password: data.password,
      });
    } else {
      reqLogin(data);
    }
  };

  return (
    <VStack space={3} mt={8}>
      <Input
        placeholder="Email address"
        textVariant="rounded"
        variant="text-input"
        name="email"
        control={control}
        iconsize={5}
        icon={<Icon as={MaterialIcons} name="email" size={24} color="green" />}
      />
      <Input
        placeholder="Password"
        passwordVariant="rounded"
        variant="secure-input"
        name="password"
        control={control}
        iconsize={5}
        icon={<MaterialIcons name="lock" size={24} color="green" />}
      />
      <Link
        _text={{
          fontSize: 'md',
          fontWeight: '500',
          color: 'primary.900',
        }}
        alignSelf="flex-end"
        onPress={() => navigation.navigate('AUTHRECOVERSCREEN')}>
        Recover access?
      </Link>
      <Button
        isLoading={loading}
        isLoadingText="Signing in.."
        onPress={handleSubmit(onSubmit)}
        bg="primary.900"
        p={2}
        size="lg"
        style={{borderRadius: 25, height: 45, marginTop: 4}}>
        Sign In
      </Button>

      <HStack mt="6" justifyContent="center">
        <Text
          fontSize="lg"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}>
          I'm a new user.{' '}
        </Text>
        <Link
          _text={{
            fontWeight: '600',
            color: 'primary.900',
            fontSize: 'lg',
          }}
          onPress={() =>
            navigation.navigate('AuthStack', {
              screen: 'AUTHREMINDERSCREEN',
            })
          }
          alignSelf="flex-end">
          Sign Up
        </Link>
      </HStack>
    </VStack>
  );
}
