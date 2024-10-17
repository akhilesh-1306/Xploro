import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError,handleSuccess } from "../utils";
import {ToastContainer} from "react-toastify"

const HostForm = ()=>{

  const [eventInfo,setEventInfo] = useState({
    name : '',
    email : '',
    activityTitle : '',
    tags : '',
    noOfPeople : '',
    date : '',
    time : '',
    location : '',
    description : '',
  });

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} = e.target;
    const copyEventInfo = {...eventInfo};
    copyEventInfo[name] = value;
    setEventInfo(copyEventInfo);
  }

  const handleAddEvent = async (e)=>{
    e.preventDefault();
    const {name,email,activityTitle,tags,noOfPeople,date,time,location,description} = eventInfo;
    if(!name || !email || !activityTitle || !tags || !noOfPeople || !date || !time || !location || !description){
      return handleError("All fields are required")
    }
    try{
      const url = "http://localhost:8080/event/addEvent";
      const token = localStorage.getItem("token");
      const response = await fetch(url,{
        method:"POST",
        headers : {
          "Content-type" : "application/json",
          'Authorization': `Bearer ${token}`
        },
        body : JSON.stringify(eventInfo),
      });
      const result = await response.json();
      const {success,message,jwtToken,name,error} = result;
      if(success){
        handleSuccess(message);
        // localStorage.setItem("token",jwtToken);
        // localStorage.setItem("loggedInUser",name);
        setTimeout(()=>{
          navigate("/home")
        },1000)
      }
      else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleError(message);
      }
    }
    catch(err){
      handleError(err);
    }
  }


    return(
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Lets get your activity hosted !
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>  

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

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
            placeholder="Enter no of people"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

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
            placeholder="Enter date of event"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

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
            placeholder="Enter time of event"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

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
            placeholder="Enter time of event"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Message Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={eventInfo.description}
            placeholder="Description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          ></textarea>
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
    )
}

export default HostForm;