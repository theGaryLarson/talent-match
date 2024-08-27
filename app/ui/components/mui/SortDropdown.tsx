import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  id: string,
  options: {label:string, value:string}[],
  label?: string | undefined,
  value?: string | undefined,
  onChange?: ((event: SelectChangeEvent<string>, child: ReactNode) => void) | undefined
  placeholder?: string | undefined,
  [key: string]: any,
}

export default function SortDropdown({
  id,
  options,
  label,
  value,
  onChange,
  placeholder,
  ...rest
}:Props) {
  return (
    <FormControl className="">
      <InputLabel id={id + "-label"}>{label}</InputLabel>
      <Select
        className="shadow-transparent border-none"
        labelId={id + "-label"}
        id={id}
        value={value == "" ? "newest" : value}
        label={label}
        onChange={onChange}
        {...rest}
      >
        {
          options.map(
            item => {
              return (
                <MenuItem key={id+"-option-"+item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              )
            }
          )
        }
      </Select>
    </FormControl>
  );
}