import { Grid2 } from '@mui/material';
import { Button } from 'flowbite-react';

export default async function Events() {
  return (
    <Grid2 container rowSpacing={2} columns={1}>
      <Grid2 container size={1} sx={{ justifyContent: 'space-between' }}>
        <p className="self-center text-xl font-medium text-black/90">
          Registered Events
        </p>
        <Button pill outline href="/underconstruction">
          Event Calendar
        </Button>
      </Grid2>
      <Grid2 container gap={2} sx={{width: '100%'}}>
        <div className="mb-2 flex w-full grow items-center rounded-lg border p-4 text-lg shadow">
          <h3>Coming Soon...</h3>
        </div>
      </Grid2>
    </Grid2>
  );
}
