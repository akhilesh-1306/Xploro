// src/components/EventCard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventCard from '../components/EventCard'; // Adjust the path as necessary
import '@testing-library/jest-dom';

describe('EventCard Component', () => {
  const mockEvent = {
    _id: 'event1',
    activityTitle: 'Yoga Class',
    date: '2024-10-01',
    location: 'City Park',
  };

  test('renders event details correctly', () => {
    render(<EventCard event={mockEvent} />);

    const titleElement = screen.getByText(/Yoga Class/);
    expect(titleElement).toBeInTheDocument();

    const dateElement = screen.getByText(/2024-10-01/);
    expect(dateElement).toBeInTheDocument();

    const locationElement = screen.getByText(/City Park/);
    expect(locationElement).toBeInTheDocument();
  });

  test('chat button opens a new tab', () => {
    render(<EventCard event={mockEvent} />);

    // Mock window.open to test opening a new tab
    const mockOpen = jest.spyOn(window, 'open').mockImplementation(() => {});

    const chatButton = screen.getByText('Chat');
    userEvent.click(chatButton);

    expect(mockOpen).toHaveBeenCalledWith('http://localhost:3000', '_blank'); // Adjust URL as needed
  });
});
