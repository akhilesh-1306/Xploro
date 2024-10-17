import { useState,useEffect } from "react";
import NavScroll from "../Navbar"
import EventCard from "../components/EventCard";


const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8080/event');
            const data = await response.json();

            if (data.success) {
                setEvents(data.events);
            } else {
                console.error("Failed to fetch events");
            }
        } catch (error) {
            console.error("Error fetching events: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(); // Fetch events when the component loads
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    }

    return(
        <div className="home">
            <NavScroll/>
            {/* <EventCard/> */}
            <div className="space-y-6"> 
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    )
}

export default Home;