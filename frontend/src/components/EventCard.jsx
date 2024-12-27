import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../Utils';
import Lottie from 'react-lottie';
import successAnimation from '../animations/sccess-animation.json';

const EventCard = ({ event }) => {
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleJoin = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`https://xploro-backend.vercel.app/event/join/${event._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (data.success) {
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    navigate("/profile");
                }, 3000);
            } else {
                console.error('Failed to join the event');
            }
        } catch (error) {
            handleError(error.message);
            console.error('Error joining the event:', error);
        }
    };

    const trackInteraction = async () => {
        const token = localStorage.getItem("token");
        await fetch(`https://xploro-backend.vercel.app/user/interaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                eventId: event._id
            }),
        });
    };

    // Call trackInteraction when the event card is clicked
    const handleClickEvent = async () => {
        await trackInteraction();
        handleOpenModal();
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: successAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <>
            <div className="event-card transition-transform duration-300 ease-in-out transform hover:scale-105">
                <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="w-full sm:w-1/3 flex-shrink-0 overflow-hidden rounded-lg transition-transform duration-300 transform hover:scale-105">
                        <img
                            src={event.image ? `https://xploro-backend.vercel.app/${event.image}` : "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt={event.activityTitle}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="mt-4 sm:mt-0 sm:ml-6 w-full sm:w-2/3 flex flex-col justify-between">
                        <div onClick={handleClickEvent} className="cursor-pointer">
                            <h2 className="text-3xl font-bold text-black mb-2 transition-colors duration-300 hover:text-black-200">
                                {event.activityTitle}
                            </h2>
                            <p className="text-balack-300 mb-4">{event.description}</p>
                        </div>

                        <p className="text-sm text-gray-400 mb-4">
                            Date: {event.date} | Time: {event.time} | Location: {event.location}
                        </p>

                        <button
                            onClick={handleJoin}
                            className="self-start bg-white text-blue-500 py-2 px-6 rounded-lg shadow hover:bg-blue-500 hover:text-black transition-all duration-300"
                        >
                            Join Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for detailed view */}
            <Modal show={showModal} onHide={handleCloseModal} className="bg-gray-800">
                <Modal.Header closeButton className="bg-gray-900 text-white">
                    <Modal.Title>{event.activityTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-gray-800 text-white">
                    <img
                        src={event.image ? `https://xploro-backend.vercel.app/${event.image}` : "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={event.activityTitle}
                        className="w-full h-full object-cover rounded-lg mb-4"
                    />
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>No of People:</strong> {event.noOfPeople}</p>
                </Modal.Body>
                <Modal.Footer className="bg-gray-900">
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleJoin}>
                        Join Event
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Modal for joining event */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} className="bg-gray-800">
                <Modal.Header closeButton className="bg-green-600 text-white">
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-gray-800 text-white text-center">
                    <Lottie options={defaultOptions} height={200} width={200} />
                    <p>You have successfully joined the event!</p>
                </Modal.Body>
                <Modal.Footer className="bg-gray-900">
                    <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EventCard;
