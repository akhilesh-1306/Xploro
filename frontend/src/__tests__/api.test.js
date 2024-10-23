import { fetchEventDetails } from '../api/events';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            _id: '1',
            name: 'Sample Event',
            description: 'Event Description',
            date: '2024-12-01',
        }),
    })
);

describe('API Tests', () => {
    it('fetches event details successfully', async () => {
        const event = await fetchEventDetails('1');
        expect(event).toEqual({
            _id: '1',
            name: 'Sample Event',
            description: 'Event Description',
            date: '2024-12-01',
        });
    });

    it('handles API fetch failure', async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));
        const event = await fetchEventDetails('1');
        expect(event).toBeNull();
    });
});
