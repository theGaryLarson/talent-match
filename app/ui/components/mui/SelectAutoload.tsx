import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

interface Props<ValueType> {
  id: string,
  apiAutoloadRoute: string,
  label: string,
  value: string | ValueType,
  onChange: ((val:ValueType) => void),
  placeholder?: string,
  loadingText?: string,
  getOptionLabel: ((option:ValueType) => string),
  getOptionFromLabel: ((options:ValueType[], label:string) => ValueType),
  [key: string]: any,
}

export default function SelectAutoload<ValueType>({
  id,
  apiAutoloadRoute,
  label,
  value,
  onChange,
  placeholder,
  loadingText="Loading dropdown...",
  getOptionLabel,
  getOptionFromLabel,
  ...rest
}:Props<ValueType>) {
  const [selectValue, setSelectValue] = React.useState<string>(getOptionLabel(value));
  const [options, setOptions] = React.useState<ValueType[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);
    onChange(getOptionFromLabel(options, value));
  };

  // Load the inital filter values
  React.useEffect(() => {
    const autoload = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiAutoloadRoute);
        const data: ValueType[] = await response.json();

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
          value={selectValue}
          onChange={handleChange}
          input={<OutlinedInput notched label={label} />}
          renderValue={(selected) => {
            if (!selected) {
              return <span className="text-gray-500">{placeholder}</span>;
            }

            return selected;
          }}
          inputProps={{ 'aria-label': label }}
          {...rest}
        >
          {
            (loading)?
              (
                <MenuItem disabled>
                  <span><CircularProgress color="inherit" size={20} /> {loadingText}</span>
                </MenuItem>
              )
            : 
              (
                <MenuItem disabled>
                  {placeholder}
                </MenuItem>
              )
          }
          {
            options.map((option) => (
              <MenuItem
                key={getOptionLabel(option)}
                value={getOptionLabel(option)}
              >
                {getOptionLabel(option)}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}