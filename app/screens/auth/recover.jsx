import {Center, Box, Text, Image} from 'native-base';
import RecoverAccess from '../../modules/forms/recoveraccess';

export default function Recover() {
  return (
    <Center paddingRight={15} paddingLeft={15} flex={1}>
      <Box w="100%">
        <Image
          source={require('../../assets/images/recover.png')}
          alt="recover"
          style={{
            width: 150,
            height: 150,
            alignSelf: 'center',
            marginBottom: 15,
          }}
        />
        <Text fontSize="xl" mb={5} pl={15} fontWeight="bold">
          Email recovery access
        </Text>
        <Text pl={15} fontSize="sm">
          Enter your email to start the recover your access
        </Text>
        <RecoverAccess />
      </Box>
    </Center>
  );
}
