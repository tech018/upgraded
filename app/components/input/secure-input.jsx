import React from 'react';
import {Input, Icon, Pressable} from 'native-base';
import {Controller} from 'react-hook-form';
// import {MaterialIcons} from '@expo/vector-icons';
import {useState} from 'react';

export default function SecureInput({
  control,
  placeholder,
  name,
  iconsize,
  passwordVariant,
  icon,
}) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <Input
          variant={passwordVariant}
          onChangeText={val => onChange(val)}
          onBlur={onBlur}
          value={value}
          type={show ? 'text' : 'password'}
          // InputLeftElement={
          //   <Icon as={icon} size={iconsize} ml="2" color="muted.400" />
          // }
          // InputRightElement={
          //   <Pressable onPress={() => setShow(!show)}>
          //     <Icon
          //       as={
          //         <MaterialIcons
          //           name={show ? 'visibility-off' : 'visibility'}
          //         />
          //       }
          //       size={iconsize}
          //       mr="2"
          //       color="muted.400"
          //     />
          //   </Pressable>
          // }
          placeholder={placeholder}
        />
      )}
      name={name}
    />
  );
}
