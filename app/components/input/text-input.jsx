import {Input, Icon} from 'native-base';
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
      render={({field: {onChange, onBlur, value}}) => (
        <Input
          ref={ref}
          variant={textVariant}
          onChangeText={val => onChange(val)}
          onBlur={onBlur}
          value={value}
          InputLeftElement={
            <Icon as={icon} ml="2" size={iconsize} color="muted.400" />
          }
          placeholder={placeholder}
        />
      )}
      name={name}
    />
  );
}
