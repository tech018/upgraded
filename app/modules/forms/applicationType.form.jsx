import {useNavigation} from '@react-navigation/native';
import {Box, Button, Icon, Image, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {uApplicantType} from '../../store/application.slice';
import {useLayoutEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const items = [
  {
    id: 1,
    name: 'Employee',
    image: (
      <Image
        style={{width: 150, height: 150}}
        source={require('../../assets/icons/employee.png')}
        alt="employee"
      />
    ),
    value: 'employee',
  },
  {
    id: 2,
    name: 'Student',
    image: (
      <Image
        style={{width: 120, height: 120}}
        source={require('../../assets/icons/student.png')}
        alt="student"
      />
    ),
    value: 'student',
  },
  {
    id: 3,
    name: 'Public Driver',
    image: (
      <Image
        style={{width: 120, height: 120}}
        source={require('../../assets/icons/public-driver.png')}
        alt="public"
      />
    ),
    value: 'public',
  },
  {
    id: 4,
    name: 'Others',
    image: (
      <Image
        style={{width: 120, height: 150}}
        source={require('../../assets/icons/others.png')}
        alt="others"
      />
    ),
    value: 'others',
  },
];

export default function ApplicationTypeForm({setActive, active}) {
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSelect = name => {
    setSelected(name);
  };

  const handleNext = () => {
    dispatch(uApplicantType(selected));
    setActive(active + 1);
  };

  const handleGoBack = () => {
    if (active !== 0) return setActive(active - 1);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          onPress={() => handleGoBack()}
          as={MaterialIcons}
          name="arrow-back-ios"
          size={5}
          color="#fff"
        />
      ),
    });
  }, [navigation]);

  return (
    <Box>
      <Box style={styles.container}>
        <Text fontSize={20}>Please select your application type</Text>
        {items.map(item => (
          <TouchableOpacity
            onPress={() => handleSelect(item.value)}
            style={[
              styles.touch,
              {backgroundColor: selected === item.value ? '#02851f' : 'white'},
            ]}
            key={item.id}>
            {item.image}
            <Text
              style={{
                color: selected === item.value ? 'white' : 'black',
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
              }}
              textAlign="center">
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </Box>
      <Button
        // isLoading={loading}
        // isLoadingText="Activating account"
        onPress={handleNext}
        bg="primary.900"
        disabled={selected === '' ? true : false}
        size="lg"
        style={{
          borderRadius: 25,
          height: 45,
          marginTop: 30,
          marginLeft: 15,
          marginRight: 15,
        }}>
        Next
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    margin: 15,
  },
  touch: {
    borderRadius: 10,
  },
});
