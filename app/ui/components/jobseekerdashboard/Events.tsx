import { Card, Divider, Grid2 } from "@mui/material";
import PillButton from "../PillButton";
import { EventTypeEnum, getRegisteredEvents } from "@/app/lib/events";
import Event from "@/app/ui/components/Event";
import React from "react";

export default async function Events() {
  const response = await getRegisteredEvents(true);

  return (
    <Grid2 container rowSpacing={2} columns={1}>
      <Grid2
        spacing={1}
        container
        size={1}
        sx={{ justifyContent: "space-between" }}
      >
        <p className="self-center text-xl font-medium text-button-secondary-idle-text">
          Registered Events
        </p>
        <PillButton
          href="/services/jobseekers/dashboard/events"
          disableElevation
          sx={{
            backgroundColor: "#f6f6f6",
            color: "secondary.main",
          }}
        >
          Event Calendar
        </PillButton>
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
          {response?.map((item, i, arr) => (
            <React.Fragment key={i}>
              <Event
                showLink={true}
                registered={true}
                event={{
                  ...item.event,
                  eventType: item.event.eventType as EventTypeEnum,
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
