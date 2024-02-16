import {Input, Icon, Text} from 'native-base';
import {Controller} from 'react-hook-form';

export default function TextInput({
  icon,
  iconsize,
  textVariant,
  control,
  placeholder,
  name,
  ref,
}) {
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}, formState: {errors}}) => (
        <>
          <Input
            size="xl"
            _focus={{borderColor: errors[name] ? 'red.500' : 'primary.900'}}
            ref={ref}
            variant={textVariant}
            onChangeText={val => onChange(val)}
            onBlur={onBlur}
            borderColor={errors[name] ? 'red.500' : 'primary.900'}
            value={value}
            InputLeftElement={
              <Icon as={icon} ml="2" size={iconsize} color="muted.400" />
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
