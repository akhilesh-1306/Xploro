import { useState, useEffect } from "react";
import NavScroll from "../Navbar";
import EventCard from "../components/EventCard";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

    // Function to calculate distance between two lat/lon points using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const fetchUserLocation = async () => {
        try {
            const response = await fetch('https://xploro-backend.vercel.app/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setUserLocation({ latitude: data.user.latitude, longitude: data.user.longitude });
            } else {
                toast.error("Failed to fetch user location.");
            }
        } catch (error) {
            console.error("Error fetching user location:", error);
            toast.error("Error fetching user location.");
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await fetch('https://xploro-backend.vercel.app/event');
            const data = await response.json();
            if (data.success) {
                const filteredEvents = data.events.filter(event => {
                    const distance = calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        event.latitude,
                        event.longitude
                    );
                    return distance <= 75; // Show events within 75 km
                });
                setEvents(filteredEvents);
                // toast.success("Events fetched successfully!"); // Success toast
            } else {
                console.error("Failed to fetch events");
                toast.error("Failed to fetch events.");
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            toast.error("Error fetching events.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (userLocation.latitude !== 0 && userLocation.longitude !== 0) {
            fetchEvents();
        }
    }, [userLocation]);

    return (
        <>
            <NavScroll />
            <div className="home-page">
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div
                            className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
                        ></div>
                    </div>

                ) : (
                    <div className="events">
                        {events.map(event => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default Home;


