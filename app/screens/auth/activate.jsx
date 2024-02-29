import {Center, Box, Text, VStack} from 'native-base';
import ActivateForm from '../../modules/forms/activate.form';
export default function Activate() {
  return (
    <VStack flex={1}>
      <Center px="5" flex={1}>
        <Box w="100%">
          <Text fontSize="xl" mb={4} textAlign="center" fontWeight="bold">
            Activation
          </Text>
          <Text mb={2} fontSize="sm" textAlign="center">
            Enter your OTP to start the activation process
          </Text>
          <ActivateForm />
        </Box>
      </Center>
    </VStack>
  );
}
