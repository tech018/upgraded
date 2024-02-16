import {forwardRef} from 'react';
import TextInput from './text-input';
import SelectInput from './select-input';
import SecureInput from './secure-input';
import CheckBoxInput from './checkbox-input';

const inputs = {
  'text-input': TextInput,
  'select-input': SelectInput,
  'secure-input': SecureInput,
  'checkbox-input': CheckBoxInput,
};

const Input = forwardRef(({variant, ...props}, ref) => {
  const InputComponents = inputs[variant];
  const _props = {...props, ref};
  if (InputComponents)
    return <InputComponents {..._props} /> ?? <TextInput {..._props} />;
});

export default Input;
