import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

interface Props<ValueType> {
  id: string,
  apiAutoloadRoute: string,
  label: string,
  value: ValueType | string,
  onChange: ((event: SelectChangeEvent<ValueType | string>) => void),
  placeholder?: string | undefined,
  getOptionLabel: ((option:ValueType) => string),
  [key: string]: any,
}

export default function SelectAutoload<ValueType>({
  id,
  apiAutoloadRoute,
  label,
  value,
  onChange,
  placeholder,
  getOptionLabel,
  ...rest
}:Props<ValueType>) {
  const [selectValue, setSelectValue] = React.useState<ValueType | string>();
  const [options, setOptions] = React.useState<ValueType[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<ValueType | string>) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);
    onChange(event);
  };

  // Load the inital filter values
  React.useEffect(() => {
    const autoload = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiAutoloadRoute);
        const data: ValueType[] = await response.json();

        console.log(data)

        setOptions(data); // Update the options with fetched data

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    autoload();
  }, []);

  return (
    <div>
      <FormControl fullWidth variant="outlined" >
        <InputLabel htmlFor={id} shrink>
          {label}
        </InputLabel>
        <Select
          id={id}
          displayEmpty
          value={value}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) {
              return <em>{placeholder}</em>;
            }

            return (typeof selected === "string")? selected : getOptionLabel(selected);
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={getOptionLabel(option)}
              value={getOptionLabel(option)}
            >
              {getOptionLabel(option)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}