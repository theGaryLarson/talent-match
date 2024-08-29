import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface Props {
    id: string,
    options: {label:string, value:string}[],
    label: string,
    value: string[],
    onChange: ((event: SelectChangeEvent<string[]>) => void),
    placeholder?: string | undefined,
    [key: string]: any,
  }
  
  export default function MultipleSelectCheckmarks({
    id,
    options,
    label,
    value,
    onChange,
    placeholder,
    ...rest
  }:Props) {
  const [filter, setFilter] = React.useState<string[]>([]);
  const [formattedLabel, setFormattedLabel] = React.useState<string>(label);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setFilter(typeof value === 'string' ? value.split(',') : value);
    onChange(event);
  };

  // Load the inital filter values
  React.useEffect(() => {
    if (value?.length > 0) setFilter(value);
  }, []);

  React.useEffect(() => {
    setFormattedLabel(label + " (" + filter.length + ")");
  }, [filter]);

  return (
    <div className="flex flex-1 px-1">
      <FormControl className="flex flex-1">
        <InputLabel className="text-sm relative top-2 left-0">{formattedLabel}</InputLabel>
        <Select
          className="rounded-full h-7 flex"
          multiple
          value={filter}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(', ')}
        >
          {options.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              <Checkbox checked={filter.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}