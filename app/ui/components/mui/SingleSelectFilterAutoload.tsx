"use client";
import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props<ValueType> {
  apiAutoloadRoute: string;
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  getOptionLabel: (option: ValueType) => string;
  [key: string]: any;
}

export default function SingleSelectFilterAutoload<ValueType>({
  apiAutoloadRoute,
  label,
  value,
  onChange,
  getOptionLabel,
  ...rest
}: Props<ValueType>) {
  const [options, setOptions] = React.useState<ValueType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController>(null);

  React.useEffect(() => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const autoload = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiAutoloadRoute, {
          signal: controller.signal,
        });
        const data: ValueType[] = await response.json();
        setOptions(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error fetching data:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    autoload();
    return () => controller.abort();
  }, [apiAutoloadRoute]);

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
          value={value}
          disabled={loading}
          onChange={onChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected}
          sx={{
            borderRadius: "9999px",
            height: "1.75rem",
          }}
          MenuProps={{ PaperProps: { sx: { maxHeight: 500 } } }}
          {...rest}
        >
          <MenuItem dense={true} value="">
            <ListItemText primary="Any" />
          </MenuItem>
          {options.map((option) => {
            const optionLabel = getOptionLabel(option);
            return (
              <MenuItem dense={true} key={optionLabel} value={optionLabel}>
                <ListItemText primary={optionLabel} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
