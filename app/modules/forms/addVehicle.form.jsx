import {useNavigation} from '@react-navigation/native';
import {Box, Button, Icon, IconButton, Image, Text} from 'native-base';
import {useState, useLayoutEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {uVehicleType} from '../../store/application.slice';

const items = [
  {
    id: 1,
    name: 'Motorbike',
    image: (
      <Image
        style={{width: 150, height: 150, margin: 5}}
        source={require('../../assets/icons/motorbike.png')}
        alt="motorcycle"
      />
    ),
    value: 'motor',
  },
  {
    id: 2,
    name: 'Tricycle',
    image: (
      <Image
        style={{width: 150, height: 150, margin: 5}}
        source={require('../../assets/icons/tricycle.png')}
        alt="tricycle"
      />
    ),
    value: 'tricycle',
  },
  {
    id: 3,
    name: 'Four wheels or more',
    image: (
      <Image
        style={{width: 150, height: 150, margin: 5}}
        source={require('../../assets/icons/car.png')}
        alt="fourwheels"
      />
    ),
    value: 'fourwheelmore',
  },
];

export default function AddVehicleForm({active, setActive}) {
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSelect = name => {
    setSelected(name);
  };

  const application = useSelector(state => state.application);
  console.log('application', application);

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

  const handleNext = () => {
    dispatch(uVehicleType(selected));
    setActive(active + 1);
  };

  return (
    <Box>
      <Box style={styles.container}>
        <Text fontSize={20}>Please select your Vehicle type</Text>
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
