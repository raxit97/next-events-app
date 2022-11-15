import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EventList } from "../../components/events/event-list";
import { ResultsTitle } from "../../components/events/results-title";
import { Button } from "../../components/ui/button";
import { ErrorAlert } from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../constants/dummy-data";

const FilteredEventsPage = () => {

    const router = useRouter();
    const [filteredEvents, setFilteredEvents] = useState();
    const [error, setError] = useState();
    const [dateToDisplay, setDateToDisplay] = useState();
    const filterData = router.query.filterBy;

    useEffect(() => {
        if (filterData) {
            const filterYear = Number(filterData[0]);
            const filterMonth = Number(filterData[1]);
            if (
                isNaN(filterYear) || isNaN(filterMonth) || filterYear > 2030 ||
                filterYear < 2021 || filterMonth < 1 || filterMonth > 12
            ) {
                setError(true);
            } else {
                const filteredEvents = getFilteredEvents({ year: filterYear, month: filterMonth });
                const date = new Date(filterYear, filterMonth - 1);
                setFilteredEvents(filteredEvents);
                setDateToDisplay(date)
            }
        }
    }, [filterData]);

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
                !filterData && <p className="center">Loading...</p>
            }
            {
                filteredEvents && filteredEvents.length > 0
                    ?
                    <>
                        <ResultsTitle date={dateToDisplay} />
                        <EventList items={filteredEvents} />
                    </>
                    :
                    <>
                        {
                            !error &&
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

export default FilteredEventsPage;