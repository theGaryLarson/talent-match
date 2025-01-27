import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function RegionSelect({
  regions,
  region,
  handleRegionChange,
}: {
  regions: {
    cfa_aug2023july2024: string;
    cfa_msa: string;
    cfa_jobpostingsregionalbreakdownid: string;
  }[];
  region: string;
  handleRegionChange: (e: SelectChangeEvent) => void;
}) {
  return (
    <FormControl fullWidth sx={{ mb: 1 }}>
      <InputLabel id="region-select-label">Region</InputLabel>
      <Select
        labelId="region-select-label"
        value={region}
        label="Region"
        onChange={handleRegionChange}
      >
        {regions.map((region) => (
          <MenuItem
            key={region.cfa_jobpostingsregionalbreakdownid}
            value={region.cfa_jobpostingsregionalbreakdownid}
          >
            {region.cfa_msa}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
