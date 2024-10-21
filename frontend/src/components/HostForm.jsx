import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const HostForm = () => {
  const [eventInfo, setEventInfo] = useState({
    name: "",
    email: "",
    activityTitle: "",
    tags: "",
    noOfPeople: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: null, // Image state
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  // Handle image file separately
  const handleImageChange = (e) => {
    setEventInfo({ ...eventInfo, image: e.target.files[0] });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      activityTitle,
      tags,
      noOfPeople,
      date,
      time,
      location,
      description,
      image,
    } = eventInfo;

    if (!name || !email || !activityTitle || !tags || !noOfPeople || !date || !time || !location || !description || !image) {
      return handleError("All fields are required, including the image.");
    }

    try {
      const formData = new FormData(); // Use FormData to send multipart form data
      formData.append("name", name);
      formData.append("email", email);
      formData.append("activityTitle", activityTitle);
      formData.append("tags", tags);
      formData.append("noOfPeople", noOfPeople);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("image", image); // Append the image file

      const url = "http://localhost:8080/event/addEvent";
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // No need to set Content-Type for FormData
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        handleError(error?.details[0]?.message || message);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Let's get your activity hosted!
      </h2>
      <form className="space-y-6" onSubmit={handleAddEvent}>
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={eventInfo.name}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={eventInfo.email}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Activity Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="activityTitle">
            Activity Title
          </label>
          <input
            type="text"
            id="activityTitle"
            name="activityTitle"
            onChange={handleChange}
            value={eventInfo.activityTitle}
            placeholder="Enter activity title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Tags Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="tags">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            onChange={handleChange}
            value={eventInfo.tags}
            placeholder="Enter activity related tags"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* No of People Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="noOfPeople">
            No of people
          </label>
          <input
            type="number"
            id="noOfPeople"
            name="noOfPeople"
            onChange={handleChange}
            value={eventInfo.noOfPeople}
            placeholder="Enter number of people"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            value={eventInfo.date}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            onChange={handleChange}
            value={eventInfo.time}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={handleChange}
            value={eventInfo.location}
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={eventInfo.description}
            placeholder="Enter activity description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        {/* Image Upload Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange} // Separate handler for file input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HostForm;

