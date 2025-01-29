import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  id?: string;
  options: { label: string; value: string }[];
  label: string;
  value: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

export default function SingleSelectCheckmarks({
  id,
  options,
  label,
  value,
  onChange,
}: Props) {
  const [filter, setFilter] = React.useState<string[]>([]);
  // const [formattedLabel, setFormattedLabel] = React.useState<string>(label);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setFilter(typeof value === "string" ? value.split(",") : value);
    onChange(event);
  };

  // Load the initial filter values
  React.useEffect(() => {
    if (value?.length > 0) setFilter(value);
  }, []);

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
          {label}
        </InputLabel>
        <Select
          id={id}
          className=""
          value={filter}
          onChange={handleChange}
          input={<OutlinedInput />}
          sx={{
            borderRadius: "9999px",
            height: "1.75rem",
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
