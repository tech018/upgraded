import {Center, Box} from 'native-base';
import LoginForm from '../../modules/forms/login.form';
import LogoWithText from '../../modules/layouts/logo-with-text';

export default function Login() {
  return (
    <Center px="5" flex={1}>
      <Box w="100%">
        <LogoWithText />
        <LoginForm />
      </Box>
    </Center>
  );
}
