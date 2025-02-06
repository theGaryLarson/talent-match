import { Card, Divider, Grid2 } from "@mui/material";
import PillButton from "./PillButton";
import {
  EventTypeEnum,
  getAllEvents,
  getRegisteredEvents,
} from "@/app/lib/events";
import Event from "@/app/ui/components/Event";
import React from "react";

interface EventsListProps {
  headerText: string;
  showOnlyRegisteredEvents: boolean;
  showMeetingLinks: boolean;
}

export default async function EventsList({
  headerText,
  showOnlyRegisteredEvents,
  showMeetingLinks,
}: EventsListProps) {
  const allEventsResponse = await getAllEvents(true);
  const registeredEventsResponse = await getRegisteredEvents(true);

  const registered = function (id: string) {
    return registeredEventsResponse?.some((e) => e.eventId === id);
  };

  return (
    <Grid2 container rowSpacing={2} columns={1}>
      <Grid2
        spacing={1}
        container
        size={1}
        sx={{ justifyContent: "space-between" }}
      >
        <p className="self-center text-xl font-medium text-button-secondary-idle-text">
          {headerText}
        </p>
        {showOnlyRegisteredEvents && (
          <PillButton
            href="/services/events"
            disableElevation
            sx={{
              backgroundColor: "neutral.100",
              color: "secondary.main",
            }}
          >
            Events Calendar
          </PillButton>
        )}
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
          {showOnlyRegisteredEvents &&
            registeredEventsResponse?.map((item, i, arr) => (
              <React.Fragment key={i}>
                <Event
                  showLink={showMeetingLinks}
                  registered={registered(item.event.id)}
                  event={{
                    ...item.event,
                    eventType: item.event.eventType as EventTypeEnum,
                  }}
                />
                {i < arr.length - 1 && <Divider sx={{ my: 1 }} />}
              </React.Fragment>
            ))}
          {!showOnlyRegisteredEvents &&
            allEventsResponse?.events?.map((event, i, arr) => (
              <React.Fragment key={i}>
                <Event
                  showLink={showMeetingLinks}
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
    </Grid2>
  );
}
