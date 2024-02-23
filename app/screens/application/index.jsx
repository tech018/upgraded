import {useNavigation} from '@react-navigation/native';
import {Box, Button, Center, Image, Text} from 'native-base';

export default function ApplicationEntry() {
  const navigation = useNavigation();
  return (
    <Box>
      <Center>
        <Image
          source={require('../../assets/images/lock.png')}
          w={250}
          height={150}
          marginTop={10}
          marginBottom={5}
        />
        <Text pr={5} pl={5}>
          Welcome to our Electronic Gatepass Mobile App, where convenience meets
          security! Streamline your access control process with our
          user-friendly application designed to enhance your entry experience.
          Whether you're a visitor, employee, or service provider, our app
          ensures a seamless and efficient gatepass mobile application.
        </Text>
      </Center>
      <Button
        onPress={() =>
          navigation.navigate('ApplicationStack', {
            screen: 'DRIVERSLICENSESCREEN',
          })
        }
        mt="2"
        bg="primary.900"
        size="lg"
        style={{
          borderRadius: 25,
          height: 45,
          marginTop: 50,
          marginLeft: 10,
          marginRight: 10,
        }}>
        Start My Application
      </Button>
    </Box>
  );
}