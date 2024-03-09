import moment from 'moment';
import {Box, Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default function AccountSettings() {
  const {application} = useSelector(state => ({
    application: state.application,
  }));
  const driversInfo = application?.driversInfo;

  const formatDate = date => {
    let dateSubstring = date.substring(0, date.indexOf('\n'));
    let string = dateSubstring.substring(0, date.indexOf('Restrictions'));
    const final = string.replace('.', '/').replace('.', '/').replace('.', '');
    const formattedDate = moment(final, 'DD-MM-YYYY').format('YYYY-MM-DD');
    return moment(formattedDate).format('LL');
  };

  const formatBirthDate = date => {
    let dateSubstring = date.substring(0, date.indexOf('\n'));
    let string = dateSubstring.substring(0, date.indexOf('Age'));
    const final = string.replace('.', '/').replace('.', '/').replace('.', '');
    const formattedDate = moment(final, 'DD-MM-YYYY').format('YYYY-MM-DD');
    return moment(formattedDate).format('LL');
  };

  const formatGender = {
    M: 'Male',
    F: 'Female',
  };

  return (
    <Box margin={15} flex={1}>
      <Box
        borderRadius={20}
        borderStyle="solid"
        borderColor="primary.900"
        borderWidth={2}
        padding={5}>
        <Box>
          <Text
            style={{
              textTransform: 'capitalize',
              fontSize: 20,
              fontWeight: '600',
            }}>
            Full Name: {driversInfo.fullName}
          </Text>
        </Box>
        <Text
          style={{
            textTransform: 'capitalize',
            fontSize: 20,
            fontWeight: '600',
            marginTop: 10,
          }}>
          Driver's License No: {driversInfo.drLicenseNo}
        </Text>
        <Text
          style={{
            textTransform: 'capitalize',
            fontSize: 20,
            fontWeight: '600',
            marginTop: 10,
          }}>
          License Expiration: {formatDate(driversInfo.licenseExpiration)}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            marginTop: 10,
          }}>
          Address: {driversInfo.address}
        </Text>
        <Text
          style={{
            textTransform: 'capitalize',
            fontSize: 20,
            fontWeight: '600',
            marginTop: 10,
          }}>
          Date of Birth: {formatBirthDate(driversInfo.dateOfBirth)}
        </Text>
        <Text
          style={{
            textTransform: 'capitalize',
            fontSize: 20,
            fontWeight: '600',
            marginTop: 10,
          }}>
          Gender: {formatGender[`${driversInfo.gender}`]}
        </Text>
      </Box>
      <Box style={styles.button}>
        <Button
          // isLoading={loading}
          // isLoadingText="Signing in.."
          // onPress={handleSubmit(onSubmit)}
          bg="primary.900"
          p={2}
          size="lg"
          style={{borderRadius: 25, height: 45, marginTop: 4}}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  button: {position: 'absolute', bottom: 0, left: 0, width: '100%'},
});
