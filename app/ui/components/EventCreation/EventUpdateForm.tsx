'use client'
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { CreateEventData, EventUpdateData } from "@/app/lib/events";
import { Events } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function EventUpdateForm() {
  // State to manage form input values
  const router = useRouter();
  const [selectedEventId, setSelectedEventId] = useState<string>()
  const [existingEvents, setExistingEvents] = useState<Events[]>()
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [zoomLink, setZoomLink] = useState<string>("");
  const [linkTitle, setLinkTitle] = useState<string>("");
  const [eventBlurb, setEventBlurb] = useState<string>("");
  const [eventType, setEventType] = useState<string>("Webinar"); // Consider using a union type for stricter control
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
      zoomSignUpLink: zoomLink,
      linkTitle: linkTitle,
      blurb: eventBlurb,
      eventType: eventType
    };

    // You can call an API function here to create the event in the database
    try {
        console.log("Event Data Submitted: ", formData);
        const response = await fetch(`/api/events`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          console.error('Failed');
          if (submitButton) submitButton.disabled = false;
          return;
        } else {
          const data = await response.json();
          console.log('Update sucsess: ', data);
          if (submitButton) submitButton.disabled = false;
          alert('Event updated successfully!');
        }
      } catch (error) {
        console.error('Error:', error);
        if (submitButton) submitButton.disabled = false;
      }
  };
  const handleDelete = async () =>{
    try {
        const response = await fetch(`/api/events`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({eventId: selectedEventId}),
          });
          if (!response.ok) {
            console.error('Failed');
            alert('Delete Failed')
          }else{
            alert('Delete Success')
            setExistingEvents((prev)=>prev?.filter((e)=>e.id!=selectedEventId))
            resetForm();
        }
        
    } catch (error) {
        
    }
  }
  const resetForm = ()=>{
    setEventName("");
    setEventDate("");
    setZoomLink("");
    setEventBlurb("");
    setEventDescription("");
    setEventType("Workshop");
  }
  const getExistingEvents = () => {
    fetch('/api/events')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        return res.json();
      })
      .then((data) => {
        setExistingEvents(data.events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        // Optionally, update UI to show an error message to users
      });
  };
  
  useEffect(getExistingEvents, []);
  useEffect(()=>{
    const selectedEvent = existingEvents?.find((ev)=>ev.id == selectedEventId)
    if(selectedEvent != undefined){
        const eventDate = new Date(selectedEvent.date);
        setEventName(selectedEvent.name);
        setEventDate(eventDate.toISOString());
        setZoomLink(selectedEvent.zoomSignUpLink??'');
        setEventBlurb(selectedEvent.blurb??"");
        setEventDescription(selectedEvent.description??'')
        setEventType(selectedEvent.eventType);
    }
  },[selectedEventId])
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md w-6/12">
      <h2 className="text-2xl font-semibold">Update an Event</h2>
    <select
        onChange={(e)=>{setSelectedEventId(e.target.value)}}
    >
        <option>--Please Select An Event--</option>
        {
            existingEvents?.map((ev)=><option key={ev.id} value={ev.id}>{ev.name}</option>)
        }
    </select>
      {selectedEventId&&<>
      <div>
        <label htmlFor="eventTitle" className="block text-sm font-medium">Event Title</label>
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
        <label htmlFor="eventDate" className="block text-sm font-medium">Event Date</label>
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
        <label htmlFor="zoomLink" className="block text-sm font-medium">Zoom Link</label>
        <input
          type="url"
          id="zoomLink"
          value={zoomLink}
          onChange={(e) => setZoomLink(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="eventBlurb" className="block text-sm font-medium">Event Blurb</label>
        <input
          id="eventBlurb"
          value={eventBlurb}
          onChange={(e) => setEventBlurb(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="eventDescription" className="block text-sm font-medium">Event Description</label>
        <textarea
          id="eventDescription"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="eventType" className="block text-sm font-medium">Event Type</label>
        <select
          id="eventType"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="mt-2 p-2 border rounded w-full"
        >
          <option value="Workshop">Workshop</option>
          <option value="Webinar">Webinar</option>
          <option value="Conference">Conference</option>
          <option value="Meeting">Meeting</option>
        </select>
      </div>

      <div className="mt-4">
        <Button onClick={handleDelete}>Delete Event</Button>
        <Button type="submit">Create Event</Button>
      </div>

      
      </>}
    </form>
  );
}
