import React from 'react';
import {Input, Icon, Pressable, Text} from 'native-base';
import {Controller} from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
      render={({field: {onChange, onBlur, value}, formState: {errors}}) => (
        <>
          <Input
            variant={passwordVariant}
            onChangeText={val => onChange(val)}
            onBlur={onBlur}
            value={value}
            borderColor={errors[name] ? 'red.500' : 'primary.900'}
            size="xl"
            _focus={{borderColor: errors[name] ? 'red.500' : 'primary.900'}}
            type={show ? 'text' : 'password'}
            InputLeftElement={
              <Icon as={icon} size={iconsize} ml="2" color="muted.400" />
            }
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? 'visibility-off' : 'visibility'}
                    />
                  }
                  size={iconsize}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder={placeholder}
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
