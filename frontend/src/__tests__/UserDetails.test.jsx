// src/components/UserDetails.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserDetails from '../components/UserDetails'; // Adjust the path as necessary
import '@testing-library/jest-dom';

describe('UserDetails Component', () => {
  test('renders user profile details', () => {
    render(<UserDetails />);

    const profileHeader = screen.getByText(/Profile/);
    expect(profileHeader).toBeInTheDocument();

    const locationElement = screen.getByText(/Location:/);
    expect(locationElement).toBeInTheDocument();
  });

  test('toggles to edit mode on Edit button click', () => {
    render(<UserDetails />);

    const editButton = screen.getByText('Edit Profile');
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    const nameInput = screen.getByPlaceholderText(/Name/);
    expect(nameInput).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText(/Email/);
    expect(emailInput).toBeInTheDocument();

    const locationInput = screen.getByPlaceholderText(/Location/);
    expect(locationInput).toBeInTheDocument();
  });

  test('renders joined events and a chat button', () => {
    // Mock userDetails with some joined events
    const mockUserDetails = {
      joinedEvents: [
        { _id: 'event1', activityTitle: 'Yoga Class', date: '2024-10-01' },
        { _id: 'event2', activityTitle: 'Cooking Workshop', date: '2024-10-05' },
      ],
    };

    jest.spyOn(React, 'useState').mockImplementation(() => [mockUserDetails, jest.fn()]);

    render(<UserDetails />);

    const event1 = screen.getByText(/Yoga Class/);
    expect(event1).toBeInTheDocument();

    const event2 = screen.getByText(/Cooking Workshop/);
    expect(event2).toBeInTheDocument();

    const chatButtons = screen.getAllByText('Chat');
    expect(chatButtons).toHaveLength(2);

    const chatButton = chatButtons[0];
    expect(chatButton).toBeInTheDocument();

    const mockOpen = jest.spyOn(window, 'open').mockImplementation(() => {});
    userEvent.click(chatButton);
    expect(mockOpen).toHaveBeenCalledWith('http://localhost:3000', '_blank'); // Adjust URL as needed
  });
});
