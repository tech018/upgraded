import {Box, Button, Icon, Text, Image, useToast} from 'native-base';
import {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {usePostUploadORMutation} from '../../store/application.slice';
import {useDispatch, useSelector} from 'react-redux';
const includeExtra = true;

export default function UploadOfficialReciept({active, setActive}) {
  const [loading, setLoading] = useState(false);
  const application = useSelector(state => state.application);
  const {plateNumber} = application.applications;
  const [reqUpload, {isError, isLoading, isSuccess, data, error}] =
    usePostUploadORMutation();
  const [response, setResponse] = useState(null);
  const toast = useToast();

  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setLoading(false);
      toast.show({
        render: () => {
          return (
            <Box bg="red.800" px="2" py="1" rounded="sm" mb={5}>
              <Text color="#ffffff"> {error.data.message}</Text>
            </Box>
          );
        },
      });
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      dispatch(uImage(data.imageURI));
      setActive(data.redirect);
      toast.show({
        render: () => {
          return (
            <Box bg="primary.900" px="2" py="1" rounded="sm" mb={5}>
              <Text color="#ffffff"> {data.message}</Text>
            </Box>
          );
        },
      });
    }
  }, [isSuccess, data]);

  const takePicture = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = request(PERMISSIONS.IOS.CAMERA, {
        title: 'TAU Electronic App want a Camera Permission',
        message:
          'Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      if (permission._h !== 0) {
        const options = {
          saveToPhotos: true,
          mediaType: 'photo',
          includeBase64: false,
          includeExtra,
        };
        ImagePicker.launchCamera(options, setResponse);
      } else {
        toast.show({
          render: () => {
            return (
              <Box bg="red.800" px="2" py="1" rounded="sm" mb={5}>
                <Text color="#ffffff"> Camera is unavailable</Text>
              </Box>
            );
          },
        });
      }
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'TAU Electronic App want a Camera Permission',
          message:
            'Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          saveToPhotos: true,
          mediaType: 'photo',
          includeBase64: false,
          includeExtra,
        };
        ImagePicker.launchCamera(options, setResponse);
      } else {
        console.log('Camera permission denied');
      }
    }
  }, []);

  const browsePicture = useCallback(() => {
    var options = {};
    if (Platform.OS === 'ios') {
      options = {
        saveToPhotos: true,
        mediaType: 'mixed',
        includeExtra,
        presentationStyle: 'fullScreen',
        selectionLimit: 1,
      };
    } else {
      options = {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra,
      };
    }

    ImagePicker.launchImageLibrary(options, setResponse);
  }, []);

  const cancelUpload = () => {
    setResponse(null);
  };

  const confirmUpload = () => {
    const photo = {
      uri: response.assets[0].uri,
      type: response.assets[0].type,
      name: response.assets[0].fileName,
    };
    let formData = new FormData();
    //append created photo{} to formdata
    formData.append('image', photo);

    reqUpload({image: formData, plateNumber});
  };

  return (
    <Box>
      {response === null ? (
        <>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              padding: 15,
              marginTop: 15,
            }}>
            Please upload the document for official receipt.
          </Text>
          <Image
            source={require('../../assets/icons/uploadocument.png')}
            w={200}
            h={200}
            alt="uploaddocument"
            m="auto"
          />
          <Button
            size="lg"
            style={{padding: 15, borderRadius: 25, height: 50, marginTop: 15}}
            leftIcon={<Icon as={MaterialIcons} name="camera" />}
            onPress={() => takePicture()}>
            Use Camera
          </Button>
          <Text textAlign="center" p={2} mt={1.5}>
            OR
          </Text>
          <Button
            bg="primary.900"
            size="lg"
            style={{padding: 15, borderRadius: 25, height: 50, marginTop: 10}}
            leftIcon={
              <Icon as={MaterialCommunityIcons} name="view-gallery-outline" />
            }
            onPress={() => browsePicture()}>
            Browse Gallery
          </Button>
        </>
      ) : (
        <>
          <Image
            mt={10}
            m="auto"
            source={{uri: response?.assets[0].uri}}
            w={350}
            height={350}
            alt="sample"
          />
          <Button
            bg="primary.900"
            isLoading={loading}
            isLoadingText="Checking OR Reciept"
            size="lg"
            disabled={response === null ? true : false}
            style={{padding: 15, borderRadius: 25, height: 50, marginTop: 20}}
            leftIcon={<Icon as={MaterialIcons} name="cloud-upload" />}
            onPress={() => confirmUpload()}>
            Upload Image
          </Button>
          <Button
            bg="danger.600"
            size="lg"
            style={{padding: 15, borderRadius: 25, height: 50, marginTop: 15}}
            leftIcon={<Icon as={MaterialIcons} name="file-upload-off" />}
            onPress={() => cancelUpload()}>
            Cancel Upload
          </Button>
        </>
      )}
    </Box>
  );
}
