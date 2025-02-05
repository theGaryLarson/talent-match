import React from "react";
import EventsList from "@/app/ui/components/EventsList";

export default function Page() {
  return (
    <div className="ml-[25px] laptop:ml-[50px] flex-1">
      <EventsList
        headerText={"Registered Events"}
        showOnlyRegisteredEvents={true}
        showMeetingLinks={true}
      ></EventsList>
    </div>
  );
}
