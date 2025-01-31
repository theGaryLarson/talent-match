import { Card, Divider, Grid2 } from "@mui/material";
import { EventTypeEnum, getAllEvents, getRegisteredEvents } from "@/app/lib/events";
import Event from "@/app/ui/components/Event";
import React from "react";

export default async function Page() {
  const allEventsResponse = await getAllEvents(true);
  const registeredEventsResponse = await getRegisteredEvents(true);

  const registered = function (id: string) {
    return registeredEventsResponse?.some((e) => e.eventId === id);
  };

  return (
    <div className="m-0 tablet:m-4 laptop:m-8 flex-1">
      <Grid2
        spacing={1}
        container
        size={1}
        sx={{ justifyContent: "space-between" }}
      >
        <p className="self-center text-xl font-medium text-button-secondary-idle-text">
          Upcoming Events
        </p>
      </Grid2>
      <Grid2 container sx={{ width: "100%" }}>
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            pt: 1,
            px: 1,
            alignItems: "center",
          }}
        >
          {allEventsResponse?.events?.map((event, i, arr) => (
            <React.Fragment key={i}>
              <Event
                showLink={false}
                registered={registered(event.id)}
                event={{
                  ...event,
                  eventType: event.eventType as EventTypeEnum,
                }}
              />
              {i < arr.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </Card>
      </Grid2>
    </div>
  );
}
