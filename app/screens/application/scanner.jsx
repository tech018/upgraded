/**
 * Sample React Native App for BlinkID
 * https://github.com/BlinkID/blinkid-react-native
 */

import React, {Component} from 'react';

import * as BlinkIDReactNative from 'blinkid-react-native';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Box, Button, Toast} from 'native-base';
import {MICRO_BLINK_ANDROID, MICRO_BLINK_IOS, API_URL} from '@env';
import axios from 'axios';

const licenseKey = Platform.select({
  // iOS license key for applicationID: com.microblink.sample
  ios: MICRO_BLINK_IOS,
  // android license key for applicationID: com.microblink.sample
  android: MICRO_BLINK_ANDROID,
});

var renderIf = function (condition, content) {
  if (condition) {
    return content;
  }
  return null;
};

function buildResult(result, key) {
  if (result && result != -1) {
    return key + ': ' + result + '>';
  }
  return '';
}

function buildDateResult(result, key) {
  if (result && result.day && result.month && result.year) {
    return (
      key +
      ': ' +
      result.day +
      '.' +
      result.month +
      '.' +
      result.year +
      '.' +
      '\n'
    );
  }
  return '';
}

async function sendResults(data, email, navigation) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await axios
    .post(
      `${API_URL}/application/v1/requirements`,
      {
        data,
        email,
      },
      config,
    )
    .then(res => {
      if (res) {
        navigation.navigate('DashBoardStack', {screen: res.data.redirect});
      }
    })
    .catch(error => {
      if (error) {
        Toast.show({
          render: () => {
            return (
              <Box
                bg="red.800"
                marginLeft={15}
                marginRight={15}
                px="2"
                py="1"
                rounded="sm"
                mb={5}>
                <Text style={{color: '#ffffff'}}>
                  {error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message}
                </Text>
              </Box>
            );
          },
        });
      }
    });
}

function AddLineBreak(originalText) {
  const newText = originalText.replace(/>/g, '\n');
  const key = newText.replace(/_/g, ' ');
  return key;
}

export class DriversLicense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFrontImageDocument: false,
      resultFrontImageDocument: '',
      showBackImageDocument: false,
      resultBackImageDocument: '',
      showImageFace: false,
      resultImageFace: '',
      showSuccessFrame: false,
      successFrame: '',
      results: '',
      licenseKeyErrorMessage: '',
    };
  }

  async scan() {
    try {
      var blinkIdMultiSideRecognizer =
        new BlinkIDReactNative.BlinkIdMultiSideRecognizer();
      blinkIdMultiSideRecognizer.returnFullDocumentImage = true;
      blinkIdMultiSideRecognizer.returnFaceImage = true;

      const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
        new BlinkIDReactNative.BlinkIdOverlaySettings(),
        new BlinkIDReactNative.RecognizerCollection([
          blinkIdMultiSideRecognizer /*, mrtdSuccessFrameGrabber*/,
        ]),
        licenseKey,
      );

      if (scanningResults) {
        let newState = {
          showFrontImageDocument: false,
          resultFrontImageDocument: '',
          showBackImageDocument: false,
          resultBackImageDocument: '',
          showImageFace: false,
          resultImageFace: '',
          results: '',
          showSuccessFrame: false,
          successFrame: '',
        };

        for (let i = 0; i < scanningResults.length; ++i) {
          let localState = this.handleResult(scanningResults[i]);
          newState.showFrontImageDocument =
            newState.showFrontImageDocument ||
            localState.showFrontImageDocument;
          if (localState.showFrontImageDocument) {
            newState.resultFrontImageDocument =
              localState.resultFrontImageDocument;
          }
          newState.showBackImageDocument =
            newState.showBackImageDocument || localState.showBackImageDocument;
          if (localState.showBackImageDocument) {
            newState.resultBackImageDocument =
              localState.resultBackImageDocument;
          }
          newState.showImageFace =
            newState.showImageFace || localState.showImageFace;
          if (localState.resultImageFace) {
            newState.resultImageFace = localState.resultImageFace;
          }
          newState.results += localState.results;
          newState.showSuccessFrame =
            newState.showSuccessFrame || localState.showSuccessFrame;
          if (localState.successFrame) {
            newState.successFrame = localState.successFrame;
          }
        }
        newState.results += '\n';
        this.setState(newState);
      }
    } catch (error) {
      console.log(error);
      this.setState({
        showFrontImageDocument: false,
        resultFrontImageDocument: '',
        showBackImageDocument: false,
        resultBackImageDocument: '',
        showImageFace: false,
        resultImageFace: '',
        results: 'Scanning has been cancelled',
        showSuccessFrame: false,
        successFrame: '',
      });
    }
  }

  handleResult(result) {
    var localState = {
      showFrontImageDocument: false,
      resultFrontImageDocument: '',
      showBackImageDocument: false,
      resultBackImageDocument: '',
      resultImageFace: '',
      results: '',
      showSuccessFrame: false,
      successFrame: '',
    };

    if (result instanceof BlinkIDReactNative.BlinkIdMultiSideRecognizerResult) {
      let blinkIdResult = result;

      let resultString =
        buildResult(blinkIdResult.firstName.description, 'First name') +
        buildResult(blinkIdResult.lastName.description, 'Last name') +
        buildResult(blinkIdResult.fullName.description, 'Full_name') +
        buildResult(blinkIdResult.localizedName.description, 'Localized name') +
        buildResult(
          blinkIdResult.additionalNameInformation.description,
          'Additional name info',
        ) +
        buildResult(blinkIdResult.address.description, 'Address') +
        buildResult(
          blinkIdResult.additionalAddressInformation.description,
          'Additional address info',
        ) +
        buildResult(
          blinkIdResult.documentNumber.description,
          'Document_number',
        ) +
        buildResult(
          blinkIdResult.documentAdditionalNumber.description,
          'Additional document number',
        ) +
        buildResult(blinkIdResult.sex.description, 'Sex') +
        buildResult(
          blinkIdResult.issuingAuthority.description,
          'Issuing authority',
        ) +
        buildResult(blinkIdResult.nationality.description, 'Nationality') +
        buildDateResult(blinkIdResult.dateOfBirth, 'Date_of_birth') +
        buildResult(blinkIdResult.age, 'Age') +
        buildDateResult(blinkIdResult.dateOfIssue, 'Date_of_issue') +
        buildDateResult(blinkIdResult.dateOfExpiry, 'Date_of_expiry') +
        buildResult(
          blinkIdResult.dateOfExpiryPermanent,
          'Date of expiry permanent',
        ) +
        buildResult(blinkIdResult.expired, 'Expired') +
        buildResult(blinkIdResult.maritalStatus.description, 'Martial status') +
        buildResult(
          blinkIdResult.personalIdNumber.description,
          'Personal id number',
        ) +
        buildResult(blinkIdResult.profession.description, 'Profession') +
        buildResult(blinkIdResult.race.description, 'Race') +
        buildResult(blinkIdResult.religion.description, 'Religion') +
        buildResult(
          blinkIdResult.residentialStatus.description,
          'Residential status',
        ) +
        buildResult(
          blinkIdResult.processingStatus.description,
          'Processing status',
        ) +
        buildResult(
          blinkIdResult.recognitionMode.description,
          'Recognition mode',
        );
      let dataMatchResult = blinkIdResult.dataMatch;
      resultString +=
        buildResult(
          dataMatchResult.stateForWholeDocument,
          'State for the whole document',
        ) +
        buildResult(dataMatchResult.states[0].state, 'dateOfBirth') +
        buildResult(dataMatchResult.states[1].state, 'dateOfExpiry') +
        buildResult(dataMatchResult.states[2].state, 'documentNumber');

      let licenceInfo = blinkIdResult.driverLicenseDetailedInfo;
      if (licenceInfo) {
        var vehicleClassesInfoString = '';
        if (licenceInfo.vehicleClassesInfo) {
          for (let i = 0; i < licenceInfo.vehicleClassesInfo.length; i++) {
            vehicleClassesInfoString +=
              buildResult(
                licenceInfo.vehicleClassesInfo[i].vehicleClass.description,
                'Vehicle class',
              ) +
              buildResult(
                licenceInfo.vehicleClassesInfo[i].licenceType.description,
                'License type',
              ) +
              buildDateResult(
                licenceInfo.vehicleClassesInfo[i].effectiveDate,
                'Effective date',
              ) +
              buildDateResult(
                licenceInfo.vehicleClassesInfo[i].expiryDate,
                'Expiry date',
              );
          }
        }
        resultString +=
          buildResult(licenceInfo.restrictions.description, 'Restrictions') +
          buildResult(licenceInfo.endorsements.description, 'Endorsements') +
          buildResult(licenceInfo.vehicleClass.description, 'Vehicle class') +
          buildResult(licenceInfo.conditions.description, 'Conditions') +
          vehicleClassesInfoString;
      }

      // there are other fields to extract
      localState.results += resultString;

      // Document image is returned as Base64 encoded JPEG
      if (blinkIdResult.fullDocumentFrontImage) {
        localState.showFrontImageDocument = true;
        localState.resultFrontImageDocument =
          'data:image/jpg;base64,' + blinkIdResult.fullDocumentFrontImage;
      }
      if (blinkIdResult.fullDocumentBackImage) {
        localState.showBackImageDocument = true;
        localState.resultBackImageDocument =
          'data:image/jpg;base64,' + blinkIdResult.fullDocumentBackImage;
      }
      // Face image is returned as Base64 encoded JPEG
      if (blinkIdResult.faceImage) {
        localState.showImageFace = true;
        localState.resultImageFace =
          'data:image/jpg;base64,' + blinkIdResult.faceImage;
      }
    }
    return localState;
  }

  render() {
    let displayFields = this.state.results;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Driver's License Information</Text>
        <View style={styles.buttonContainer}>
          {renderIf(
            this.state.results.length <= 1,
            <Image
              source={require('../../assets/images/scan.png')}
              style={{width: 350, height: 320}}
            />,
          )}
          <Text style={styles.results}>{AddLineBreak(displayFields)}</Text>
          <Button
            w="100%"
            onPress={this.scan.bind(this)}
            title="Click to Scan"
            bg="primary.900"
            mt={10}>
            {this.state.results.length <= 1 ? 'Scan ID' : 'Rescan ID'}
          </Button>

          {renderIf(
            this.state.results.length > 1,
            <Button
              w="100%"
              title="Click to Scan"
              bg="primary.900"
              mt={5}
              onPress={() =>
                sendResults(
                  displayFields,
                  this.props.route.params?.email,
                  this.props.navigation,
                )
              }>
              Next
            </Button>,
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 50,
  },
  buttonContainer: {
    margin: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  results: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
  },
  imageResult: {
    flex: 1,
    flexShrink: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

export default DriversLicense;
