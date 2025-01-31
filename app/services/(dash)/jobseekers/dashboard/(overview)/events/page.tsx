import React from "react";
import EventsList from "@/app/ui/components/EventsList";

export default function Page() {
  return (
    <div className="m-0 tablet:m-4 laptop:m-8 flex-1">
      <EventsList
        headerText={"Registered Events"}
        showOnlyRegisteredEvents={true}
        showMeetingLinks={true}
      >
      </EventsList>
    </div>
  );
}
