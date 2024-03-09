import {Box, Button, Text, VStack, useToast} from 'native-base';
import React, {useEffect, useState} from 'react';
import Input from '../../components/input';
import {useForm} from 'react-hook-form';
import validation from '../../validation/auth.validation';
import {yupResolver} from '@hookform/resolvers/yup';
import {ucredentials, usePutActivateUserMutation} from '../../store/auth.slice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ActivateForm = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {auth} = useSelector(state => ({auth: state.auth}));
  const [reqActivate, {data, isError, isLoading, isSuccess, error}] =
    usePutActivateUserMutation();
  const {handleSubmit, control, setError} = useForm({
    resolver: yupResolver(validation.activate),
    defaultValues: {
      otp: '',
    },
  });
  const navigate = useNavigation();

  useEffect(() => {
    if (isError) {
      setLoading(false);
      setError('otp', {type: 'custom', message: error.data.message});
    }
  }, [isError, setError]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              <Text color="#ffffff"> {data.message}</Text>
            </Box>
          );
        },
      });
      dispatch(ucredentials({email: data.email, token: data.token}));
      navigate.navigate('ApplicationStack', {screen: data.redirect});
      2342;
    }
  }, [isSuccess, data]);

  const onSubmit = data => {
    reqActivate({email: auth.email, otp: data.otp});
  };

  return (
    <VStack space={3}>
      <Input variant="otp-input" control={control} maxlength={6} name="otp" />
      <Button
        isLoading={loading}
        isLoadingText="Activating account"
        onPress={handleSubmit(onSubmit)}
        bg="primary.900"
        size="lg"
        style={{borderRadius: 25, height: 45, marginTop: 30}}>
        Submit
      </Button>
    </VStack>
  );
};

export default ActivateForm;
