import {Button, Icon, VStack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import authValidation from '../../validation/auth.validation';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Input from '../../components/input';

export default function RecoverAccess() {
  const {handleSubmit, control} = useForm({
    resolver: yupResolver(authValidation.recover),
    defaultValues: {
      email: '',
    },
  });
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
        // isLoading={loading}
        // isLoadingText="Signing in.."
        // onPress={handleSubmit(onSubmit)}
        bg="primary.900"
        p={2}
        size="lg"
        style={{borderRadius: 25, height: 45, marginTop: 10}}>
        Submit
      </Button>
    </VStack>
  );
}
