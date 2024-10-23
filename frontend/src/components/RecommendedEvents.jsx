// import React, { useEffect, useState } from 'react';
// import EventCard from './EventCard'; // Import your EventCard component

// const RecommendedEvents = () => {
//     const [recommendedEvents, setRecommendedEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchRecommendations = async () => {
//             const token = localStorage.getItem("token");
//             try {
//                 const response = await fetch(`http://localhost:8080/user/recommendation`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 const data = await response.json();
//                 console.log(data);
//                 if (data.success) {
//                     setRecommendedEvents(data.recommendedEvents);
//                 } else {
//                     setError(data.message);
//                 }
//             } catch (error) {
//                 setError('Error fetching recommendations');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecommendations();
//     }, []);

//     if (loading) {
//         return <div>Loading recommendations...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h2>Recommended Events</h2>
//             <div className="event-list">
//                 {recommendedEvents.map(event => (
//                     <EventCard key={event._id} event={event} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RecommendedEvents;



import React, { useEffect, useState } from 'react';
import EventCard from './EventCard'; // Import your EventCard component

const RecommendedEvents = () => {
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async (eventId) => {
            try {
                const response = await fetch(`http://localhost:8080/event/${eventId}`);
                if (!response.ok) {
                    throw new Error(`Error fetching event details for ID: ${eventId}`);
                }
                const data = await response.json();
                return data.event; // Adjust this based on your API response structure
            } catch (error) {
                console.error(error);
                return null; // Return null if there's an error
            }
        };

        const fetchRecommendations = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`http://localhost:8080/user/recommendation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data.success) {
                    // Use Set to keep unique event IDs
                    const uniqueEventIds = [...new Set(data.recommendedEvents)];

                    // Fetch details for each unique recommended event ID
                    const eventDetailsPromises = uniqueEventIds.map(eventId =>
                        fetchEventDetails(eventId)
                    );
                    // console.log(eventDetailsPromises);
                    const fullEvents = await Promise.all(eventDetailsPromises);

                    // Filter out any failed fetches (null values)
                    const validEvents = fullEvents.filter(event => event !== null);
                    setRecommendedEvents(validEvents);
                    console.log(recommendedEvents);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Error fetching recommendations');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return <div>Loading recommendations...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="event-list">
                {recommendedEvents.map((event, index) => (
                    <EventCard key={event._id || index} event={event} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedEvents;

