import EventCreationForm from "@/app/ui/components/EventCreation/EventCreationForm";
import EventUpdateForm from "@/app/ui/components/EventCreation/EventUpdateForm";

export default function page(){
    return(
        <main className="w-full">
        <EventCreationForm/>
        <EventUpdateForm/>
        </main>
    );
}