import {Center, Box, Text} from 'native-base';
import RegisterFrom from '../../modules/forms/register.form';

export default function Register() {
  return (
    <Center px="5" flex={1}>
      <Box w="100%">
        <Text fontSize="xl" fontWeight="bold">
          Let's get started
        </Text>
        <Text fontSize="sm" mt={2}>
          Please fillout the form below and provide with your desired
          credentials
        </Text>
        <RegisterFrom />
      </Box>
    </Center>
  );
}
