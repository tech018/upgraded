import {Text} from 'native-base';
import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';

export default function OTPInput({maxlength, name, control}) {
  return (
    <Controller
      control={control}
      render={({field: {onChange}, formState: {errors}}) => (
        <>
          <OtpInput
            numberOfDigits={maxlength}
            focusColor="green"
            focusStickBlinkingDuration={500}
            onTextChange={onChange}
            secureTextEntry={true}
            theme={{
              containerStyle: styles.container,
              pinCodeContainerStyle: styles.pinCodeContainer,
            }}
          />
          {errors[name] && (
            <Text fontSize="md" color="red.500" px={1}>
              {errors[name]?.message}
            </Text>
          )}
        </>
      )}
      name={name}
    />
  );
}

const styles = StyleSheet.create({
  pinCodeContainer: {
    borderColor: '#02851f',
  },
  container: {
    marginTop: 20,
  },
});
