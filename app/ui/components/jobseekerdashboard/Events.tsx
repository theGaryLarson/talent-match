import { Grid2 } from '@mui/material';
import RoundedButton from '../RoundedButton';
import PillButton from '../PillButton';

export default async function Events() {
  return (
    <Grid2 container rowSpacing={2} columns={1}>
      <Grid2
        spacing={1}
        container
        size={1}
        sx={{ justifyContent: 'space-between' }}
      >
        <p className="self-center text-xl font-medium text-black/90">
          Registered Events
        </p>
        <PillButton
          href="/underconstruction"
          disableElevation
          sx={{
            backgroundColor: '#f6f6f6',
            color: '#014260',
          }}
        >
          Event Calendar
        </PillButton>
      </Grid2>
      <Grid2 container gap={2} sx={{ width: '100%' }}>
        <div className="mb-2 flex w-full grow items-center rounded-lg border p-4 text-lg shadow">
          <h3>Coming Soon...</h3>
        </div>
      </Grid2>
    </Grid2>
  );
}
