import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetails = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [refresh, setRefresh] = useState("");
  const [editMode, setEditMode] = useState(false);  // Toggle edit mode
  const [formData, setFormData] = useState({});     // State for form data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });  // State for password change data

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const profileDetails = async () => {
    try {
      const url = 'http://localhost:8080/profile'; // Assuming this is your profile fetch API
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
      });
      const result = await response.json();
      if (response.ok) {
        setUserDetails(result.user); // Store user details
        setFormData(result.user);    // Initialize form data with user details
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleEditProfile = () => {
    setEditMode(!editMode); // Toggle edit mode on button click
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data on change
  };

  const saveProfileDetails = async () => {
    try {
      const url = 'http://localhost:8080/profile/update'; // Your API to update profile
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setUserDetails(result.user); // Update state with new details
        handleSuccess("Profile updated successfully");
        setEditMode(false); // Exit edit mode
        setRefresh("success");
        // navigate("/profile");
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  // Handle input changes for password fields
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Handle password update
  const changePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      handleError("New password and confirmation do not match.");
      return;
    }

    try {
      const url = 'http://localhost:8080/profile/change-password'; // Your API for password change
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });
      const result = await response.json();
      if (response.ok) {
        handleSuccess("Password changed successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }); // Reset password form
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  // Function to delete a hosted event
  const deleteEvent = async (eventId) => {
    try {
      const url = `http://localhost:8080/event/delete/${eventId}`; // Your API for deleting an event
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        // setRefresh("deleted");
        navigate("/home");
        handleSuccess("Event deleted successfully");
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err);
    }
  };


  useEffect(() => {
    profileDetails(); // Call profileDetails when the page loads
  }, []);

  useEffect(() => {
    if (refresh === "success") {
      profileDetails(); // Fetch updated profile details
    }
  }, [editMode]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg">
        {/* Profile Image */}
        <img
          src="https://static.vecteezy.com/system/resources/previews/030/504/836/non_2x/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg"
          alt="Profile Pic"
          className="w-32 h-32 rounded-full mb-4"
        />

        {/* User Details */}
        <div className="text-center">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleFormChange}
                className="mb-2 p-2 border"
              />
              <input
                type="text"
                name="email"
                value={formData.email || ""}
                onChange={handleFormChange}
                className="mb-2 p-2 border"
              />
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleFormChange}
                className="mb-2 p-2 border"
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{userDetails.name}</h2>
              <p className="text-gray-600 mb-2">{userDetails.email}</p>
              <p className="text-gray-600">Location: {userDetails.location}</p>
            </>
          )}
        </div>

        {/* Edit and Logout Buttons */}
        <div className="flex space-x-4 mt-4">
          {editMode ? (
            <>
              <button
                onClick={saveProfileDetails}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Save Profile
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditProfile}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Change Password Section */}
      {editMode && (
        <div className="bg-gray-100 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3>
          <form onSubmit={changePassword}>
            <div className="flex flex-col space-y-4">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="p-2 border"
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="p-2 border"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="p-2 border"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {/* Events Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Joined Events */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Joined Events</h3>
          <ul className="space-y-2">
            {userDetails.joinedEvents && userDetails.joinedEvents.length > 0 ? (
              userDetails.joinedEvents.map((event) => (
                <li key={event._id} className="border-b border-gray-300 pb-2">
                  {event.activityTitle} - {event.date}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No events joined yet</li>
            )}
          </ul>
        </div>

        {/* Hosted Events */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Hosted Events</h3>
          <ul className="space-y-2">
            {userDetails.hostedEvents && userDetails.hostedEvents.length > 0 ? (
              userDetails.hostedEvents.map((event) => (
                <li key={event._id} className="border-b border-gray-300 pb-2 flex justify-between items-center">
                  <span>{event.activityTitle} - {event.date}</span>
                  <button
                    onClick={() => deleteEvent(event._id)} // Function to delete event
                    className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No events hosted yet</li>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default UserDetails;
