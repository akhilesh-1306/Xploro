import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { useState,useEffect } from 'react';

const UserDetails = ()=>{
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        location: 'New York, USA',
        // joinedEvents: [],
        // hostedEvents: [],
      });
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        handleSuccess("Logged out");
      setTimeout(()=>{
          navigate("/login");
      },1000)
    };

    const profileDetails = async () =>{
        try {
            const url = 'http://localhost:8080/profile';
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("JWT token not found.");
                return; // Handle the absence of the token here
            }
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            //   body : JSON.stringify({token}),
            });
            const result = await response.json();
            if (response.ok) {
              // Update user details in the state
              setUserDetails(result.user);
            } else {
              handleError(result.message);
            }
          } catch (err) {
            handleError(err);
          }
    }

    useEffect(() => {
        profileDetails(); // Call profileDetails when the page loads
      }, []);

    return(
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg">
        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Pic"
          className="w-32 h-32 rounded-full mb-4"
        />
        
        {/* User Details */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{userDetails.name}</h2>
          <p className="text-gray-600 mb-2">{userDetails.email}</p>
          <p className="text-gray-600">Location: {userDetails.location}</p>
        </div>

        {/* Edit and Logout Buttons */}
        <div className="flex space-x-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
            Logout
          </button>
        </div>
      </div>



      {/* Events Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Joined Events */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Joined Events</h3>
          <ul className="space-y-2">
            <li className="border-b border-gray-300 pb-2">Event 1 - 10th October 2024</li>
            <li className="border-b border-gray-300 pb-2">Event 2 - 20th October 2024</li>
            <li className="border-b border-gray-300 pb-2">Event 3 - 30th October 2024</li>
            <li className="text-gray-500">No more events joined</li>
          </ul>
        </div>

        {/* Hosted Events */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Hosted Events</h3>
          <ul className="space-y-2">
            <li className="border-b border-gray-300 pb-2">Event A - 5th September 2024</li>
            <li className="border-b border-gray-300 pb-2">Event B - 15th September 2024</li>
            <li className="border-b border-gray-300 pb-2">Event C - 25th September 2024</li>
            <li className="text-gray-500">No more events hosted</li>
          </ul>
        </div>
      </div>
    </div>
    )
}

export default UserDetails;