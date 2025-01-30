"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import { EventTypeEnum, EventUpdateData } from "@/app/lib/events";
export default function EventCreationForm() {
  // State to manage form input values
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [registerLink, setRegisterLink] = useState<string>("");
  const [joinMeetingLink, setJoinMeetingLink] = useState("");
  const [duration, setDuration] = useState<number>(90);
  const [eventBlurb, setEventBlurb] = useState<string>("");
  const [eventType, setEventType] = useState<EventTypeEnum>(
    EventTypeEnum.General,
  ); // Consider using a union type for stricter control
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const submitButton = event.currentTarget.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    if (submitButton) submitButton.disabled = true;
    // Form data to send to backend (example)
    const formData: EventUpdateData = {
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      date: new Date(eventDate), // Ensure date is correctly formatted
      registrationLink: registerLink,
      joinMeetingLink: joinMeetingLink,
      blurb: eventBlurb,
      eventType: eventType,
      duration: duration,
    };

    // You can call an API function here to create the event in the database
    try {
      console.log("Event Data Submitted: ", formData);
      const response = await fetch(`/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Failed");
        if (submitButton) submitButton.disabled = false;
        return;
      } else {
        const data = await response.json();
        console.log("Creation sucsess: ", data);
        if (submitButton) submitButton.disabled = false;
        alert("Provider updated successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      if (submitButton) submitButton.disabled = false;
    }

    // Reset the form
    resetForm();
  };
  const resetForm = () => {
    setEventName("");
    setEventDate("");
    setRegisterLink("");
    setJoinMeetingLink("");
    setEventBlurb("");
    setEventDescription("");
    setEventLocation("");
    setEventType(EventTypeEnum.General);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold">Create an Event</h2>

      <div>
        <label htmlFor="eventTitle" className="block text-sm font-medium">
          Event Title
        </label>
        <input
          type="text"
          id="eventTitle"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="eventLocation" className="block text-sm font-medium">
          Event Location (Remote or Physical Adress)
        </label>
        <input
          type="text"
          id="eventLocation"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium">
          Event Date
        </label>
        <input
          type="datetime-local"
          id="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium">
          Event Duration
        </label>
        <input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value as unknown as number)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="zoomLink" className="block text-sm font-medium">
          Register Link
        </label>
        <input
          type="url"
          id="zoomLink"
          value={registerLink}
          onChange={(e) => setRegisterLink(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="joinLink" className="block text-sm font-medium">
          Join Link
        </label>
        <input
          type="url"
          id="joinLink"
          value={joinMeetingLink}
          onChange={(e) => setJoinMeetingLink(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="eventBlurb" className="block text-sm font-medium">
          Event Blurb
        </label>
        <input
          id="eventBlurb"
          value={eventBlurb}
          onChange={(e) => setEventBlurb(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="eventDescription" className="block text-sm font-medium">
          Event Description
        </label>
        <textarea
          id="eventDescription"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="eventType" className="block text-sm font-medium">
          Event Type
        </label>
        <select
          id="eventType"
          value={eventType}
          onChange={(e) => setEventType(e.target.value as EventTypeEnum)} // Cast to EventType
          className="mt-2 p-2 border rounded w-full"
        >
          {Object.values(EventTypeEnum).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <Button onClick={resetForm}>Reset Form</Button>
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  );
}
