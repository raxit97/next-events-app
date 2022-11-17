import { useRouter } from "next/router";
import { EventList } from "../../components/events/event-list";
import { EventsSearch } from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";

const AllEventsPage = ({ events }) => {

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

export async function getStaticProps() {
    const events = await getAllEvents();
    return {
        props: { events },
        revalidate: 60
    }
}
 
export default AllEventsPage;