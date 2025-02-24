"use client";

import { Card, Divider, Grid2, Stack, Typography } from "@mui/material";
import PillButton from "./PillButton";
import {
  EventTypeEnum,
  PastEventGraceDuration,
} from "@/app/lib/events";
import Event, { EventData } from "@/app/ui/components/Event";
import React, { useEffect } from "react";

interface EventsListProps {
  headerText: string;
  showOnlyRegisteredEvents: boolean;
  showMeetingLinks: boolean;
}

export default function EventsList({
  headerText,
  showOnlyRegisteredEvents,
  showMeetingLinks,
}: EventsListProps) {
  const [loading, setLoading] = React.useState(true);
  const [showPast, setShowPast] = React.useState(false);
  const [upcomingEvents, setUpcomingEvents] = React.useState<EventData[]>([]);
  const [pastEvents, setPastEvents] = React.useState<EventData[]>([]);
  const [displayEvents, setDisplayEvents] = React.useState<EventData[]>([]);
  const [registeredEvents, setRegisteredEvents] = React.useState<EventData[]>([]);

  const sortEvents = (events : EventData[]) => {
    const now = Date.now();
    const pastEvents = events.filter((event) => new Date(event.date).getTime() < now);
    setPastEvents(pastEvents);
    const upcomingEvents = events.filter((event) => new Date(event.date).getTime() + PastEventGraceDuration > now);
    setUpcomingEvents(upcomingEvents);
    setDisplayEvents(showPast ? pastEvents : upcomingEvents);
  }

  const getAllEvents = () => {
    fetch("/api/events")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        return res.json();
      })
      .then((data) => {
        sortEvents(data.events);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        // Optionally, update UI to show an error message to users
      });

    // fetch("/api/events")
    // .then((res) => {
    //   if (!res.ok) {
    //     throw new Error("Failed to fetch events");
    //   }
    //   return res.json();
    // })
    // .then((data) => {
    //   setRegisteredEvents(data.events);
    // })
    // .catch((error) => {
    //   console.error("Error fetching events:", error);
    //   // Optionally, update UI to show an error message to users
    // });
  };

  useEffect(getAllEvents, []);

  const registered = function (id: string) {
    return registeredEvents?.some((e) => e.id === id);
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
        <Stack
          direction={"row"}
          gap={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          <PillButton color={showPast ? "inherit" : "secondary"} onClick={() => {
            setShowPast(false);
            setDisplayEvents(upcomingEvents);
          }}>
            Upcoming
          </PillButton>
          <Typography
            variant="h4"
            sx={{ fontSize: "24px", textAlign: "center", fontWeight: 400 }}
          >
            |
          </Typography>
          <PillButton color={showPast ? "secondary" : "inherit"} onClick={() => {
            setShowPast(true);
            setDisplayEvents(pastEvents);
          }}>
            Past
          </PillButton>
        </Stack>
        {showOnlyRegisteredEvents && (
          <PillButton
            color="inherit"
            href="/services/events"
            sx={{
              color: "secondary.main",
            }}
          >
            All Events
          </PillButton>
        )}
        {!showOnlyRegisteredEvents && (
          <PillButton
            color="inherit"
            href="/services/jobseekers/dashboard/events"
            sx={{
              color: "secondary.main",
            }}
          >
            My Events
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
          {loading && <p className="text-center my-4">Loading...</p>}
          {!loading && showOnlyRegisteredEvents && registeredEvents?.length === 0 && (
            <p className="text-center">
              You have not registered for any events
            </p>
          )}
          {showOnlyRegisteredEvents &&
            registeredEvents?.map((item, i, arr) => (
              <React.Fragment key={i}>
                <Event
                  showLink={showMeetingLinks}
                  registered={registered(item.id)}
                  event={{
                    ...item,
                    eventType: item.eventType as EventTypeEnum,
                  }}
                />
                {i < arr.length - 1 && <Divider sx={{ my: 1 }} />}
              </React.Fragment>
            ))}
          {!loading && !showOnlyRegisteredEvents && displayEvents?.length === 0 && (
            <p className="text-center">No events</p>
          )}
          {!showOnlyRegisteredEvents &&
            displayEvents?.map((event, i, arr) => (
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
