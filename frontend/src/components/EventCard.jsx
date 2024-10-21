import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';

const EventCard = ({ event }) => {
    // State to control the modal visibility
    const [showModal, setShowModal] = useState(false);

    // Function to open and close the modal
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const navigate = useNavigate();

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

    return (
        <>
            <div className="event-card">
                <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg flex flex-col sm:flex-row items-center sm:items-start">
                    {/* Left Image Section */}
                    <div className="w-full sm:w-1/3 flex-shrink-0">
                        <img
                            src={event.image ? `http://localhost:8080/${event.image}` : "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt={event.activityTitle}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Right Content Section */}
                    <div className="mt-4 sm:mt-0 sm:ml-6 w-full sm:w-2/3 flex flex-col justify-between">
                        <div onClick={handleOpenModal} className="cursor-pointer">
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

            {/* Modal for detailed view */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{event.activityTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={event.image ? `http://localhost:8080/${event.image}` : "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={event.activityTitle}
                        className="w-full h-full object-cover rounded-lg mb-4"
                    />
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.location}</p>

                    <p><strong>No of People:</strong> {event.noOfPeople}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleJoin}>
                        Join Event
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EventCard;
