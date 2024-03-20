import {Controller} from 'react-hook-form';
import {Select, Icon, CheckIcon, Text} from 'native-base';
export default function SelectInput({
  name,
  control,
  icon,
  iconSize,
  options,
  placeholder,
  selectVariant,
  ref,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{required: true}}
      render={({field: {onChange, value}, formState: {errors}}) => (
        <>
          <Select
            ref={ref}
            size="xl"
            InputLeftElement={
              <Icon as={icon} size={iconSize} ml="2" color="muted.400" />
            }
            variant={selectVariant}
            selectedValue={value}
            placeholder={placeholder}
            borderColor={errors[name] ? 'red.500' : 'primary.900'}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={onChange}>
            {options.map((item, index) => (
              <Select.Item
                key={index}
                label={item.label || item.regDesc}
                value={item.value || `${item.regDesc}-${item.regCode}`}
              />
            ))}
          </Select>
          {errors[name] && (
            <Text fontSize="md" color="red.500" px={1}>
              {errors[name]?.message}
            </Text>
          )}
        </>
      )}
    />
  );
}
