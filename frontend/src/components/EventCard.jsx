import React from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom"
import { handleError } from '../utils';
import { useEffect } from 'react';

const EventCard = ({ event }) => {
    // Function to handle the "Join Now" button click
    const navigate = useNavigate();
    
    // const checkImage = () => {
    //     console.log(event.image);
    // }
    const handleJoin = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/event/join/${event._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (data.success) {
                alert('You have successfully joined the event!');
                navigate("/profile");
            } else {
                console.error('Failed to join the event');
            }
        } catch (error) {
            handleError(error.message);
            console.error('Error joining the event:', error);
        }
    };

    // useEffect(() => {
    //     checkImage();  // Call the function immediately on mount or on event.image change
    // }, [event.image]);

    return (
        <div className="event-card">
            <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg flex flex-col sm:flex-row items-center sm:items-start">
                {/* Left Image Section */}
                <div className="w-full sm:w-1/3 flex-shrink-0">
                    <img
                        // src={event.image || "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        // alt="Event Image"

                        src={`http://localhost:8080/${event.image}` || "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={event.activityTitle}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Right Content Section */}
                <div className="mt-4 sm:mt-0 sm:ml-6 w-full sm:w-2/3 flex flex-col justify-between">
                    <div>
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {event.activityTitle}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 mb-4">
                            {event.description}
                        </p>
                    </div>

                    {/* Date */}
                    <p className="text-sm text-gray-500 mb-4">
                        Date: {event.date} | Time: {event.time} | Location : {event.location}
                    </p>

                    {/* Join Button */}
                    <button
                        onClick={handleJoin} // Add onClick handler to call handleJoin
                        className="self-start bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Join Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
