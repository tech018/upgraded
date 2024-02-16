import {VStack, Button, Link, HStack, Text, Icon} from 'native-base';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Input from '../../components/input/index';
import {useNavigation} from '@react-navigation/native';
import validation from '../../validation/auth.validation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function RegisterForm() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const {handleSubmit, control} = useForm({
    resolver: yupResolver(validation.register),
    defaultValues: {
      email: '',
      password: '',
      mobile: '',
    },
  });

  const onSubmit = data => {};

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
        placeholder="Mobile number"
        textVariant="rounded"
        variant="text-input"
        name="mobile"
        control={control}
        iconsize={5}
        icon={<Icon as={MaterialIcons} name="phone" size={24} color="green" />}
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

      <Button
        isLoading={loading}
        isLoadingText="Signing up..please wait.."
        onPress={handleSubmit(onSubmit)}
        mt="2"
        bg="primary.900"
        size="lg"
        style={{borderRadius: 25, height: 45, marginTop: 18}}>
        Sign up
      </Button>
      <VStack space={2} mt={5}>
        <HStack mt="1" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            I'm already registered?{' '}
          </Text>
          <Link
            _text={{
              fontWeight: '600',
              color: 'primary.900',
            }}
            onPress={() => navigation.navigate('Login')}
            alignSelf="flex-end">
            Sign In
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
}
