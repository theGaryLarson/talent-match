"use client";
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

interface Props<ValueType> {
  id: string;
  apiAutoloadRoute: string;
  label: string;
  value: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
  getOptionLabel: (option: ValueType) => string;
  [key: string]: any;
}

export default function MultipleSelectFilterAutoload<ValueType>({
  apiAutoloadRoute,
  label,
  value,
  onChange,
  getOptionLabel,
  ...rest
}: Props<ValueType>) {
  const [filter, setFilter] = React.useState<string[]>([]);
  const [options, setOptions] = React.useState<ValueType[]>([]);
  const [formattedLabel, setFormattedLabel] = React.useState<string>(label);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setFilter(typeof value === "string" ? value.split(",") : value);
    onChange(event);
  };

  // Load the initial filter values
  React.useEffect(() => {
    const autoload = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiAutoloadRoute);
        const data: ValueType[] = await response.json();

        setOptions(data); // Update the options with fetched data

        if (value?.length !== 0) {
          setFilter(value);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    autoload();
  }, []);

  React.useEffect(() => {
    setFormattedLabel(label + " (" + filter.length + ")");
  }, [filter, label]);

  return (
    <div className="flex flex-1 px-1">
      <FormControl className="flex flex-1">
        <InputLabel
          sx={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            position: "relative",
            top: "8px",
            left: "0px",
          }}
        >
          {formattedLabel}
        </InputLabel>
        <Select
          multiple
          value={filter}
          onChange={handleChange}
          input={<OutlinedInput />}
          disabled={loading}
          renderValue={(selected) => selected.join(", ")}
          sx={{
            borderRadius: "9999px",
            height: "1.75rem",
          }}
          MenuProps={{ PaperProps: { sx: { maxHeight: 500 } } }}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem
              dense={true}
              key={getOptionLabel(option)}
              value={getOptionLabel(option)}
            >
              <Checkbox
                checked={filter.indexOf(getOptionLabel(option)) !== -1}
              />
              <ListItemText primary={getOptionLabel(option)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
