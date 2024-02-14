import {Controller} from 'react-hook-form';
import {Select, Icon, CheckIcon} from 'native-base';
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
      render={({field: {onChange, value}}) => (
        <Select
          ref={ref}
          InputLeftElement={
            <Icon as={icon} size={iconSize} ml="2" color="muted.400" />
          }
          variant={selectVariant}
          selectedValue={value}
          placeholder={placeholder}
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
      )}
    />
  );
}
