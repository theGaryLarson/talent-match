import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface Props<ValueType> {
  id: string;
  className?: string;
  apiAutoloadRoute: string;
  disabled?: boolean;
  label: string;
  value: ValueType | null;
  onChange: (val: ValueType | null) => void;
  placeholder?: string;
  loadingText?: string;
  getOptionLabel: (option: ValueType) => string;
  getOptionId: (option: ValueType) => string;
  getOptionFromId: (options: ValueType[], label: string) => ValueType | null;
  [key: string]: any;
}

export default function SelectAutoload<ValueType>({
  id,
  className = '',
  apiAutoloadRoute,
  disabled = false,
  label,
  value,
  onChange,
  placeholder,
  loadingText = 'Loading dropdown...',
  getOptionLabel,
  getOptionId,
  getOptionFromId,
  ...rest
}: Props<ValueType>) {
  const [selectValue, setSelectValue] = React.useState<string>(
    value ? getOptionId(value) : '',
  );
  const [options, setOptions] = React.useState<ValueType[]>([]);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);
    onChange(getOptionFromId(options, value));
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
    };
    autoload();
  }, [apiAutoloadRoute]);

  return (
    <div className={className}>
      <FormControl disabled={disabled} fullWidth variant="outlined">
        <InputLabel htmlFor={id} shrink>
          {label}
        </InputLabel>
        {loading ? (
          <Select
            displayEmpty
            renderValue={(selected) => (
              <span className="text-gray-500">
                <CircularProgress color="inherit" size={20} /> {loadingText}
              </span>
            )}
          >
            <MenuItem disabled>
              <span>
                <CircularProgress color="inherit" size={20} /> {loadingText}
              </span>
            </MenuItem>
          </Select>
        ) : (
          <Select
            id={id}
            displayEmpty
            value={selectValue}
            onChange={handleChange}
            input={<OutlinedInput notched label={label} />}
            renderValue={(selected) => {
              let option = getOptionFromId(options, selected);
              if (selected && option) {
                return getOptionLabel(option);
              }
              else {
                setSelectValue('');
                return <span className="text-gray-500">{placeholder}</span>;
              }
            }}
            inputProps={{ 'aria-label': label }}
            {...rest}
          >
            <MenuItem disabled>{placeholder}</MenuItem>
            {options.map((option) => (
              <MenuItem key={getOptionId(option)} value={getOptionId(option)}>
                {getOptionLabel(option)}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </div>
  );
}
