import React, { useEffect, useState } from 'react';
import EventCard from './EventCard'; // Import your EventCard component

const RecommendedEvents = () => {
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
                    setRecommendedEvents(data.recommendedEvents);
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
            <h2>Recommended Events</h2>
            <div className="event-list">
                {recommendedEvents.map(event => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedEvents;
