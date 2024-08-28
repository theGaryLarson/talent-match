import { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
interface Props {
  label?: string | undefined,
  value?: Dayjs | null,
  onChange?: ((date: Dayjs | null) => void) | undefined,
  placeholder?: string | undefined,
  [key: string]: any,
}

export default function DatePickerDayjs({
  label,
  views,
  value,
  onChange
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        views={views}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}