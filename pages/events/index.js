import { useRouter } from "next/router";
import { EventList } from "../../components/events/event-list";
import { EventsSearch } from "../../components/events/events-search";
import { getAllEvents } from "../../constants/dummy-data";

const AllEventsPage = () => {

    const events = getAllEvents();
    const router = useRouter();

    const filterEvents = (year, month) => {
        router.push(`/events/${year}/${month}`);
    };

    return (
        <>
            <EventsSearch onSearch={filterEvents} />
            <EventList items={events} />
        </>
    );
}
 
export default AllEventsPage;