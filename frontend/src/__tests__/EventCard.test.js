import React from 'react';
import { render, screen } from '@testing-library/react';
import EventCard from '../components/EventCard';

describe('EventCard Component', () => {
    const mockEvent = {
        _id: '123',
        name: 'Test Event',
        description: 'This is a test event',
        date: '2024-11-01',
    };

    it('renders event details', () => {
        render(<EventCard event={mockEvent} />);
        expect(screen.getByText('Test Event')).toBeInTheDocument();
        expect(screen.getByText('This is a test event')).toBeInTheDocument();
        expect(screen.getByText('2024-11-01')).toBeInTheDocument();
    });

    it('has a link to event details', () => {
        render(<EventCard event={mockEvent} />);
        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', `/events/123`);
    });
});
