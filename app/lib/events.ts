import { auth } from "@/auth";
import { Role } from "@/data/dtos/UserInfoDTO";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateEventData = {
  name: string;
  description: string;
  location: string;
  date: Date;
  zoomSignUpLink: string;
  linkTitle: string;
  blurb: string;
  eventType: string; // Consider using a union type for stricter control, e.g., "Webinar" | "Workshop" | "Seminar"
  //createdById: string;
};

export type EventUpdateData = Partial<CreateEventData>; // For updating only specific fields


export async function createEvent(data: CreateEventData): Promise<{
    success: boolean;
    event?: unknown;
    error?: string;
  }> {
    try {
      const session = await auth();
      if(!session?.user){
        throw new Error("must be user")
      }
      if(!(session.user.roles.includes(Role.ADMIN)  || session.user.roles.includes(Role.CASE_MANAGER))){
        throw new Error("Not Authorized to make this request")
      }
      const newEvent = await prisma.events.create({
        data: {
          name: data.name,
          description: data.description,
          location: data.location,
          date: data.date,
          zoomSignUpLink: data.zoomSignUpLink,
          linkTitle: data.linkTitle,
          blurb: data.blurb,
          eventType: data.eventType,
          createdById: session.user.id,
        },
      });
      return { success: true, event: newEvent };
    } catch (error) {
      console.error("Error creating event:", error);
      return { success: false, error: (error as Error).message };
    }
  }

//todo setup to use session
  export async function signUpForEvent(
    eventId: string
  ): Promise<{
    success: boolean;
    attendee?: unknown;
    error?: string;
  }> {
    try {
      const session = await auth();
      if(!session?.user.id){
        throw new Error("must be user")
      }
      const attendee = await prisma.eventsOnUsers.create({
        data: {
          userId: session.user.id,
          eventId,
        },
      });
      return { success: true, attendee };
    } catch (error) {
      console.error("Error signing up for event:", error);
      return { success: false, error: (error as Error).message };
    }
  }
  
export async function getAllEvents(){
    try {
        const res = await prisma.events.findMany()
        return { success: true, message: "Events fetched successfully.", events: res };
      } catch (error) {
        console.error("Error deleting event:", error);
        return { success: false, error: (error as Error).message };
      }
}

//todo add protections 
  export async function deleteEvent(eventId: string): Promise<{
    success: boolean;
    message?: string;
    error?: string;
  }> {
    try {
      const session = await auth();
      if(!session?.user){
        throw new Error("must be user")
      }
      if(!(session.user.roles.includes(Role.ADMIN)  || session.user.roles.includes(Role.CASE_MANAGER))){
        throw new Error("Not Authorized to make this request")
      }
      await prisma.events.delete({
        where: { id: eventId },
      });
      return { success: true, message: "Event deleted successfully." };
    } catch (error) {
      console.error("Error deleting event:", error);
      return { success: false, error: (error as Error).message };
    }
  }



//todo add protections
  export async function updateEvent(
    eventId: string,
    updatedData: EventUpdateData
  ): Promise<{
    success: boolean;
    event?: unknown;
    error?: string;
  }> {
    try {
      const session = await auth();
      if(!session?.user){
        throw new Error("must be user")
      }
      if(!(session.user.roles.includes(Role.ADMIN)  || session.user.roles.includes(Role.CASE_MANAGER))){
        throw new Error("Not Authorized to make this request")
      }
      const updatedEvent = await prisma.events.update({
        where: { id: eventId },
        data: {
          ...updatedData,
        },
      });
      return { success: true, event: updatedEvent };
    } catch (error) {
      console.error("Error updating event:", error);
      return { success: false, error: (error as Error).message };
    }
  }