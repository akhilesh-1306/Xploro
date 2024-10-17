import React from 'react';

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg flex flex-col sm:flex-row items-center sm:items-start">
                {/* Left Image Section */}
                <div className="w-full sm:w-1/3 flex-shrink-0">
                    <img
                        src={event.image || "https://via.placeholder.com/150"}
                        alt="Event Image"
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
                    <button className="self-start bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300">
                        Join Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
