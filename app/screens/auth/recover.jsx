import {Center, Box, Text, VStack} from 'native-base';
import RecoverAccess from '../../modules/forms/recoveraccess';

export default function Recover() {
  return (
    <Center px="5" flex={1}>
      <Box w="100%">
        <Text fontSize="xl" mb={5} fontWeight="bold">
          Email recovery access
        </Text>
        <Text fontSize="sm">
          Enter your email to start the recover your access
        </Text>
        <RecoverAccess />
      </Box>
    </Center>
  );
}
