import {Button, Icon, VStack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import authValidation from '../../validation/auth.validation';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Input from '../../components/input';
import {uemail, usePutRecoverAccessMutation} from '../../store/auth.slice';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import converter from '../../helpers/converter';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
export default function RecoverAccess() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [reqRecover, {data, error, isError, isLoading, isSuccess}] =
    usePutRecoverAccessMutation();
  const {handleSubmit, control} = useForm({
    resolver: yupResolver(authValidation.recover),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      navigation.navigate('AuthStack', {screen: data.redirect});
      dispatch(uemail(data.email));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setLoading(false);
      console.log('error', error.data);
    }
  }, [isError, error]);

  const onSubmit = data => {
    if (Platform.OS === 'ios') {
      reqRecover({
        email: converter.lowerCaseFirstLetter(data.email),
      });
    } else {
      reqRecover(data);
    }
  };

  return (
    <VStack space={3} mt={3}>
      <Input
        placeholder="Email address"
        textVariant="rounded"
        variant="text-input"
        name="email"
        control={control}
        iconsize={5}
        icon={<Icon as={MaterialIcons} name="email" size={24} color="green" />}
      />
      <Button
        isLoading={loading}
        isLoadingText="Recovering account..."
        onPress={handleSubmit(onSubmit)}
        bg="primary.900"
        p={2}
        size="lg"
        style={{borderRadius: 25, height: 45, marginTop: 25}}>
        Submit
      </Button>
    </VStack>
  );
}
