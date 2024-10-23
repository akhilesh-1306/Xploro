import { render, screen, waitFor } from '@testing-library/react';
import RecommendedEvents from './RecommendedEvents';

// Mocking the fetch call to recommendation API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      success: true,
      recommendedEvents: ['event1', 'event2', 'event1'], // Duplicate event ID
    }),
  })
);

// Mock fetch for event details
const mockFetchEventDetails = (id) => ({
  _id: id,
  name: `Event ${id}`,
  location: `Location ${id}`,
});

jest.mock('./fetchEventDetails', () => jest.fn((eventId) => {
  return Promise.resolve(mockFetchEventDetails(eventId));
}));

describe('RecommendedEvents Component', () => {
  it('should render a list of unique event cards', async () => {
    render(<RecommendedEvents />);

    await waitFor(() => {
      const eventCards = screen.getAllByRole('listitem');
      expect(eventCards).toHaveLength(2); // Expect only 2 unique events
    });
  });

  it('should show error when recommendation fetch fails', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API Error')));
    
    render(<RecommendedEvents />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Error fetching recommendations')).toBeInTheDocument();
    });
  });
});
