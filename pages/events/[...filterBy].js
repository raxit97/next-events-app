import { useEffect, useState } from "react";
import { EventList } from "../../components/events/event-list";
import { ResultsTitle } from "../../components/events/results-title";
import { Button } from "../../components/ui/button";
import { ErrorAlert } from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";
import useSWR from "swr"
import { useRouter } from "next/router";

const FilteredEventsPage = () => {

    const router = useRouter();
    const filterData = router.query.filterBy;
    const [filteredEvents, setFilteredEvents] = useState();
    const [error, setError] = useState(false);
    const [date, setDate] = useState();
    const { data } = useSWR("https://nextjs-course-2921b-default-rtdb.firebaseio.com/events.json");

    useEffect(() => {
        if (filterData && data) {
            const filterYear = Number(filterData[0]);
            const filterMonth = Number(filterData[1]);
            if (
                isNaN(filterYear) || isNaN(filterMonth) || filterYear > 2030 ||
                filterYear < 2021 || filterMonth < 1 || filterMonth > 12
            ) {
                setError(true);
            } else {
                const events = [];
                const keys = Object.keys(data);
                keys.forEach((key) => {
                    events.push({
                        ...data[key],
                        id: key
                    });
                });
                const filteredEvents = events.filter((event) => {
                    const eventDate = new Date(event.date);
                    return eventDate.getFullYear() === filterYear && eventDate.getMonth() === filterMonth - 1;
                });
                const date = new Date(filterYear, filterMonth - 1);
                setFilteredEvents(filteredEvents);
                setDate(date);
            }
        }
    }, [filterData, data]);

    return (
        <div>
            {
                error &&
                <>
                    <ErrorAlert>
                        <p>Invalid filters. Please adjust your values</p>
                    </ErrorAlert>
                    <div className="center">
                        <Button link="/events">Show all events</Button>
                    </div>
                </>
            }
            {
                !data && <p className="center">Loading...</p>
            }
            {
                filteredEvents && filteredEvents.length > 0
                    ?
                    <>
                        <ResultsTitle date={date} />
                        <EventList items={filteredEvents} />
                    </>
                    :
                    <>
                        {
                            !error && data &&
                            <>
                                <ErrorAlert>
                                    <p>No events found for the chosen filters!</p>
                                </ErrorAlert>
                                <div className="center">
                                    <Button link="/events">Show all events</Button>
                                </div>
                            </>
                        }
                    </>
            }
        </div>
    );
}

// export async function getServerSideProps(context) {

//     const { params } = context;
//     const filterData = params.filterBy;
//     const filterYear = Number(filterData[0]);
//     const filterMonth = Number(filterData[1]);
//     if (
//         isNaN(filterYear) || isNaN(filterMonth) || filterYear > 2030 ||
//         filterYear < 2021 || filterMonth < 1 || filterMonth > 12
//     ) {
//         return {
//             props: {
//                 error: true
//             }
//             // notFound: true,
//             // redirect: {
//             //     destination: "/error"
//             // }
//         };
//     } else {
//         const filteredEvents = await getFilteredEvents({ year: filterYear, month: filterMonth });
//         const date = new Date(filterYear, filterMonth - 1);
//         return {
//             props: {
//                 filteredEvents,
//                 date: date.toString()
//             }
//         }
//     }
// }

export default FilteredEventsPage;