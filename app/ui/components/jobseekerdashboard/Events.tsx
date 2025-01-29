import { Grid2 } from '@mui/material';
import PillButton from '../PillButton';
import { EventTypeEnum, getAllEvents, getRegisteredEvents, signUpForEvent } from '@/app/lib/events';
import Event from '@/app/ui/components/Event';

export default async function Events() {

  const response = await getRegisteredEvents(true);

  return (
    <Grid2 container rowSpacing={2} columns={1}>
      <Grid2
        spacing={1}
        container
        size={1}
        sx={{ justifyContent: 'space-between' }}
      >
        <p className="self-center text-xl font-medium text-button-secondary-idle-text">
          Registered Events
        </p>
        <PillButton
          href="/services/jobseekers/dashboard/events"
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
        <div className="w-full p-2 items-center rounded-lg border text-lg shadow">
          {(await response)?.map((item, i) => (
            <Event key={i} showLink={true} registered={true} event={{ ...item.event, eventType: item.event.eventType as EventTypeEnum }} />
          ))}
          {(await response)?.length === 0 && <div className="text-lg text-center my-4">Not registered for any events</div>}
        </div>
      </Grid2>
    </Grid2>
  );
}

