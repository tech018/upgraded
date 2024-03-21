import {Box, Text, VStack, Icon, Button} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Input from '../../components/input/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import applicationValidation from '../../validation/application.validation';
import {useDispatch} from 'react-redux';
import {uPlateNumber} from '../../store/application.slice';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';

export default function AddApplicationForm({active, setActive}) {
  const dispatch = useDispatch();

  const {handleSubmit, control, watch} = useForm({
    resolver: yupResolver(applicationValidation.application),
    defaultValues: {
      plateNumber: '',
    },
  });
  const navigation = useNavigation();
  const plateNumber = watch('plateNumber');

  const onSubmit = data => {
    dispatch(uPlateNumber(data.plateNumber));
    setActive(active + 1);
  };

  const handleGoBack = () => {
    navigation.goBack();
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
    <VStack space={3} m={5}>
      <Box>
        <Text mb={2} fontSize={18}>
          Please enter your vehicle plate number
        </Text>
        <Input
          placeholder="Plate Number"
          textVariant="rounded"
          variant="text-input"
          name="plateNumber"
          control={control}
          iconsize={5}
          icon={
            <Icon as={MaterialIcons} name="explicit" size={24} color="green" />
          }
        />
        {plateNumber !== '' ? (
          <Box>
            <Text fontSize={20} mb={2}>
              Your {plateNumber.length > 6 ? 'MV File No' : 'Plate number'} is{' '}
            </Text>
            <Box
              paddingLeft={plateNumber.length > 10 ? 2 : 0}
              paddingRight={plateNumber.length > 10 ? 2 : 0}
              backgroundColor="gray.200"
              borderStyle="solid"
              borderRadius={2}
              borderColor="gray.800"
              borderWidth="1px">
              <Text
                textAlign="center"
                fontWeight="semibold"
                fontSize={plateNumber.length > 10 ? 30 : 50}>
                {plateNumber.toUpperCase()}
              </Text>
            </Box>
          </Box>
        ) : null}
      </Box>
      <Button
        // isLoading={loading}
        // isLoadingText="Activating account"
        onPress={handleSubmit(onSubmit)}
        bg="primary.900"
        size="lg"
        style={{borderRadius: 25, height: 45, marginTop: 10}}>
        Next
      </Button>
    </VStack>
  );
}
