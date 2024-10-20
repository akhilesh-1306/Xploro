import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventCard from '../components/EventCard';
import NavScroll from '../Navbar';

const SearchResults = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Helper to extract the search query from the URL
  const getQueryParams = (query) => {
    return new URLSearchParams(query).get('query');
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`http://localhost:8080/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.events);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = getQueryParams(location.search);
    if (query) {
      fetchSearchResults(query);
    }
  }, [location.search]);

  if (loading) {
    return <div>Loading search results...</div>;
  }

  return (
    <div className="search-results">
      <div className="space-y-6">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
