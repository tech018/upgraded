import {VStack, Button, Link, HStack, Text, Icon} from 'native-base';
import {useForm} from 'react-hook-form';

import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import authValidation from '../../validation/auth.validation';
import Input from '../../components/input/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function LoginForm() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(authValidation.login),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    reqLogin({email: data.email.trim(), password: data.password.trim()});
  };

  const handleActivate = () => {
    navigation.navigate('Activate');
    setActivate(false);
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
        // icon={<MaterialIcons name="lock" />}
      />
      <Link
        _text={{
          fontSize: 'xs',
          fontWeight: '500',
          color: 'primary.900',
        }}
        alignSelf="flex-end"
        onPress={() => navigation.navigate('Forgot')}>
        Forget Password?
      </Link>
      <Button
        isLoading={loading}
        isLoadingText="Signing in.."
        onPress={handleSubmit(onSubmit)}
        bg="primary.900"
        size="lg"
        style={{borderRadius: 25, height: 45, marginTop: 4}}>
        Sign In
      </Button>

      <HStack mt="6" justifyContent="center">
        <Text
          fontSize="sm"
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
          }}
          onPress={() => navigation.navigate('Register')}
          alignSelf="flex-end">
          Sign Up
        </Link>
      </HStack>
    </VStack>
  );
}