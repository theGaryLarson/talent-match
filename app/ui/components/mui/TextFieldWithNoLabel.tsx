import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

interface Props {
  id: string;
  label?: string | undefined;
  onChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  placeholder?: string | undefined;
  [key: string]: any;
}

export default function TextFieldWithNoLabel({
  id,
  label,
  onChange,
  placeholder,
  ...rest
}: Props) {
  return (
    <TextField
      {...rest}
      id={id}
      placeholder={placeholder}
      margin="normal"
      size="medium"
      variant="outlined"
      onChange={onChange}
      sx={{
        "& .MuiOutlinedInput-root input:focus": {
          boxShadow: "none",
        },
        "& .MuiInputBase-root.MuiOutlinedInput-root .MuiInputBase-input.MuiOutlinedInput-input::placeholder":
          {
            opacity: "0.42!important",
          },
      }}
    />
  );
}
