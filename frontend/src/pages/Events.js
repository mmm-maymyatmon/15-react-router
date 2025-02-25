// EventsPage Component
import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <EventsList events={events} />
    </Suspense>
  );
}

export default EventsPage;


async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch events." }),
      { status: 500 }
    );
  }

  const data = await response.json();
  
  if (!Array.isArray(data.events)) {
    throw new Error("Events data is not an array");
  }

  return data.events;
}


export async function loader() {
  const events = await loadEvents(); 
  return { events };
}
