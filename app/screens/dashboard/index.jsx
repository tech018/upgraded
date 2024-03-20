import {Box, Text, Heading, Stack, ScrollView, Skeleton} from 'native-base';
import React, {useEffect, useState} from 'react';
import StatusItems from '../../modules/statusItems';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  uDriversInfo,
  useGetDriverInfoMutation,
} from '../../store/application.slice';
const items = [
  {
    id: 1,
    image: (
      <Image
        style={{width: 40, height: 40}}
        source={require('../../assets/icons/car.png')}
        alt="car"
      />
    ),
    data: 2,
    name: 'car',
  },
  {
    id: 2,
    image: (
      <Image
        style={{width: 40, height: 40}}
        source={require('../../assets/icons/motorbike.png')}
        alt="motorbike"
      />
    ),
    data: 1,
    name: 'motorbike',
  },
  {
    id: 3,
    image: (
      <Image
        style={{width: 40, height: 40}}
        source={require('../../assets/icons/tricycle.png')}
        alt="tricycle"
      />
    ),
    data: 2,
    name: 'tricycle',
  },
];
export default function Dashboard() {
  const [loadingDriver, setLoadingDriver] = useState(false);
  const dispatch = useDispatch();

  const auth = useSelector(state => state.application);
  const application = useSelector(state => state.application);

  console.log('application', application);

  const [reqDriver, {data, error, isError, isLoading, isSuccess}] =
    useGetDriverInfoMutation();

  const navigation = useNavigation();

  useEffect(() => {
    reqDriver({email: auth.email, token: auth.token});
  }, [auth]);

  useEffect(() => {
    if (isLoading) {
      setLoadingDriver(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setLoadingDriver(false);
      console.log('data', data);
      dispatch(uDriversInfo(data.userInfo));
    }
  }, [isSuccess]);

  return (
    <ScrollView>
      <Stack padding={15}>
        {loadingDriver ? (
          <Skeleton h="8" />
        ) : (
          <Heading style={{textTransform: 'capitalize'}} mt={5} mx={1}>
            Hi, {application?.driversInfo?.email.split('@')[0]}
          </Heading>
        )}

        <StatusItems items={items} />
      </Stack>

      <Stack flex={1} bg="green.600" h="100%" borderRadius={20} m={15}>
        <Box m={30}>
          <Heading color="#ffffff">Announcements</Heading>
          <Text mt={5} color="#ffffff">
            We're thrilled to announce the launch of our latest product line,
            designed to revolutionize your daily routine. Stay tuned for the
            unveiling event where you'll discover innovative features crafted to
            enhance your experience.
          </Text>
        </Box>
      </Stack>
    </ScrollView>
  );
}
