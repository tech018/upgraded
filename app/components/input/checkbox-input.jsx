import {Checkbox, Text} from 'native-base';
import {useState} from 'react';
import {Controller} from 'react-hook-form';

export default function CheckBoxInput({name, label, control, onPress}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{required: true}}
      render={({field: {onChange, value}}) => (
        <Checkbox
          shadow={2}
          value={value}
          name={name}
          onChange={onChange}
          bgColor={'primary.900'}
          marginLeft={1}>
          <Text onPress={onPress}> {label}</Text>
        </Checkbox>
      )}
    />
  );
}
