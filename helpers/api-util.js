const getAllEvents = async () => {
    const res = await fetch("https://nextjs-course-2921b-default-rtdb.firebaseio.com/events.json");
    const eventsData = await res.json();
    const keys = Object.keys(eventsData);
    const transformedEvents = [];
    keys.forEach((key) => {
        transformedEvents.push({
            ...eventsData[key],
            id: key
        });
    });
    return transformedEvents
};

const getFeaturedEvents = async () => {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
};

const getEventById = async(id) => {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}

const getFilteredEvents = async (dateFilter) => {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();
    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}

export { getAllEvents, getFeaturedEvents, getEventById, getFilteredEvents }
