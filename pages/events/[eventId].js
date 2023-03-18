import Head from "next/head";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import Comments from "../../components/input/comments";
import { ErrorAlert } from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const EventDetailPage = ({ event }) => {

    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{event.title}</title>
                <meta name={event.title} content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                {event.description}
            </EventContent>
            <Comments eventId={event.id} />
        </>
    );
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);
    return {
        props: { event },
        revalidate: 30
    };
}

export async function getStaticPaths() {
    const allEvents = await getFeaturedEvents();
    const paths = allEvents.map(event => ({
        params: {
            eventId: event.id
        }
    }));
    return {
        paths: paths,
        fallback: "blocking"
    };
}

export default EventDetailPage;