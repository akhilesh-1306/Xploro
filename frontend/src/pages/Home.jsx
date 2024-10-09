import { useState } from "react";
import NavScroll from "../Navbar"
import EventCard from "../components/EventCard";


const Home = () => {

    const [allEvents,setAllEvents] = useState([]);

    return(
        <div className="home">
            <NavScroll/>
            <EventCard/>
        </div>
    )
}

export default Home;